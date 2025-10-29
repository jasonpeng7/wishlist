import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import * as jose from 'jose';
import { v4 as uuidv4 } from 'uuid';

interface UserPayload {
  userId: string;
}

export async function POST(req: NextRequest) {
  // Create a single Supabase client for the API route
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!
  );

  try {
    // 1. Authenticate the user from the token cookie
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let userId: string;
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
      const { payload } = await jose.jwtVerify<UserPayload>(token, secret);
      userId = payload.userId;
    } catch {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // 2. Get the file from the form data
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // 3. Upload the file to Supabase Storage
    // Sanitize filename to remove special characters and spaces
    const sanitizedFileName = file.name
      .replace(/[^a-zA-Z0-9.-]/g, '_') // Replace special chars with underscores
      .replace(/_+/g, '_') // Replace multiple underscores with single
      .replace(/^_|_$/g, ''); // Remove leading/trailing underscores
    
    const fileName = `${userId}/${uuidv4()}-${sanitizedFileName}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('wishlist-images')
      .upload(fileName, file);

    if (uploadError) {
      console.error('Supabase Storage Error:', uploadError);
      return NextResponse.json({ error: 'Failed to upload to storage' }, { status: 500 });
    }

    // 4. Get the public URL of the uploaded file
    const { data: urlData } = supabase.storage
      .from('wishlist-images')
      .getPublicUrl(uploadData.path);

    // 5. Return the URL to the client
    return NextResponse.json({ url: urlData.publicUrl }, { status: 200 });
  } catch (e) {
    console.error('API Route Error:', e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
