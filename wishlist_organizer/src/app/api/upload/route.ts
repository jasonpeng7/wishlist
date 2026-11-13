import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';
import { getSessionUser } from '../../../../utils/auth';
import { MAX_WISH_PHOTO_BYTES, WISH_PHOTO_SIZE_ERROR } from '../../../../utils/wishPhotoLimits';

const imageTypes: Record<string, string> = {
  jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp',
  gif: 'image/gif', heic: 'image/heic', heif: 'image/heif', avif: 'image/avif',
  tif: 'image/tiff', tiff: 'image/tiff', bmp: 'image/bmp',
};

export async function POST(req: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    // Only metadata goes through the app server. Photo bytes go directly to Storage.
    const metadata = await req.json().catch(() => null);
    if (!metadata || typeof metadata.name !== 'string' || !metadata.name ||
        typeof metadata.type !== 'string' || !Number.isSafeInteger(metadata.size) || metadata.size <= 0) {
      return NextResponse.json({ error: 'Invalid photo details' }, { status: 400 });
    }
    if (metadata.size > MAX_WISH_PHOTO_BYTES) {
      return NextResponse.json({ error: WISH_PHOTO_SIZE_ERROR }, { status: 413 });
    }

    const extension = metadata.name.split('.').pop()?.toLowerCase() || '';
    const contentType = !metadata.type || metadata.type === 'application/octet-stream'
      ? imageTypes[extension] : metadata.type.toLowerCase();
    const fileExtension = Object.keys(imageTypes).find(key => imageTypes[key] === contentType);
    if (!fileExtension) {
      return NextResponse.json({ error: 'Please choose a supported photo format, such as JPEG, PNG, or HEIF.' }, { status: 415 });
    }

    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!);
    const storage = supabase.storage.from('wishlist-images');
    const path = `${user.id}/${uuidv4()}.${fileExtension}`;
    const { data, error } = await storage.createSignedUploadUrl(path);
    if (error) {
      console.error('Supabase upload authorization error:', error);
      return NextResponse.json({ error: 'Your photo upload could not be prepared. Please try again.' }, { status: 500 });
    }
    const { data: publicUrl } = storage.getPublicUrl(path);
    return NextResponse.json({ path, token: data.token, contentType, url: publicUrl.publicUrl });
  } catch (error) {
    console.error('Photo upload error:', error);
    return NextResponse.json({ error: 'Your photo upload could not be prepared. Please try again.' }, { status: 500 });
  }
}
