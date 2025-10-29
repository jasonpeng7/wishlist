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

    // 3. Prepare file for upload to Supabase Storage
    // Infer mime from provided type or filename extension
    const originalMime = file.type || '';
    const nameExt = (() => {
      const name = (file as File).name || '';
      const idx = name.lastIndexOf('.');
      return idx !== -1 ? name.slice(idx + 1).toLowerCase() : '';
    })();
    const inferMimeFromExt = (ext: string) => {
      switch (ext) {
        case 'jpg':
        case 'jpeg':
          return 'image/jpeg';
        case 'png':
          return 'image/png';
        case 'webp':
          return 'image/webp';
        case 'gif':
          return 'image/gif';
        case 'heic':
          return 'image/heic';
        case 'heif':
          return 'image/heif';
        case 'avif':
          return 'image/avif';
        case 'tif':
        case 'tiff':
          return 'image/tiff';
        case 'bmp':
          return 'image/bmp';
        default:
          return '';
      }
    };
    let mime = originalMime || inferMimeFromExt(nameExt) || 'application/octet-stream';

    const extFromMime = (type: string) => {
      const parts = type.split('/');
      const sub = (parts[1] || '').toLowerCase();
      if (sub.startsWith('jpeg')) return 'jpeg';
      if (sub.startsWith('jpg')) return 'jpg';
      if (sub.startsWith('png')) return 'png';
      if (sub.startsWith('webp')) return 'webp';
      if (sub.startsWith('gif')) return 'gif';
      if (sub.startsWith('heic')) return 'heic';
      if (sub.startsWith('heif')) return 'heif';
      if (sub.startsWith('avif')) return 'avif';
      if (sub.startsWith('tiff')) return 'tiff';
      if (sub.startsWith('bmp')) return 'bmp';
      return 'bin';
    };

    let finalExt = extFromMime(mime);
    // If extension is unknown but it's an image, try from filename, else default to jpg
    if (finalExt === 'bin' && mime.startsWith('image/')) {
      const fallbackExtMap = new Set(['jpeg','jpg','png','webp','gif','heic','heif','avif','tiff','bmp']);
      finalExt = fallbackExtMap.has(nameExt) ? nameExt : 'jpg';
      // align mime with chosen extension when possible
      const mapped = inferMimeFromExt(finalExt);
      if (mapped) mime = mapped;
      else if (!mime || mime === 'application/octet-stream') mime = 'image/jpeg';
    }

    const fileName = `${userId}/${uuidv4()}.${finalExt}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('wishlist-images')
      .upload(fileName, file, { contentType: mime });

    if (uploadError) {
      console.error('Supabase Storage Error:', uploadError);
      return NextResponse.json({ error: uploadError.message || 'Failed to upload to storage' }, { status: 500 });
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
