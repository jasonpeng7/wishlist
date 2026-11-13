import { MAX_WISH_PHOTO_BYTES, WISH_PHOTO_SIZE_ERROR } from "./wishPhotoLimits";

export async function prepareWishPhoto(file: File): Promise<File> {
  if (file.size > MAX_WISH_PHOTO_BYTES) throw new Error(WISH_PHOTO_SIZE_ERROR);
  const isHeif = /^image\/(heic|heif)(-sequence)?$/i.test(file.type) || /\.hei[cf]$/i.test(file.name);
  if (!isHeif) return file;

  try {
    // Load the decoder only when an iPhone photo needs conversion.
    const { heicTo } = await import("heic-to/csp");
    const bitmap = await heicTo({ blob: file, type: "bitmap" });
    try {
      const scale = Math.min(1, 2048 / Math.max(bitmap.width, bitmap.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(bitmap.width * scale);
      canvas.height = Math.round(bitmap.height * scale);
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Canvas unavailable");
      context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
      const jpeg = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error("JPEG conversion failed")), "image/jpeg", 0.85);
      });
      return new File([jpeg], file.name.replace(/\.[^.]+$/, "") + ".jpg", { type: "image/jpeg" });
    } finally {
      bitmap.close();
    }
  } catch {
    throw new Error("This HEIF photo could not be converted. Try another photo or select a JPEG or PNG copy.");
  }
}
