import { put, del } from '@vercel/blob';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export interface UploadResult {
  url: string;
  pathname: string;
}

export interface UploadError {
  error: string;
}

export async function uploadImage(
  file: File
): Promise<UploadResult | UploadError> {
  // Validate file type
  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      error: `Invalid file type. Allowed types: ${ALLOWED_TYPES.join(', ')}`,
    };
  }

  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      error: `File too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB`,
    };
  }

  try {
    const blob = await put(`blog/${Date.now()}-${file.name}`, file, {
      access: 'public',
    });

    return {
      url: blob.url,
      pathname: blob.pathname,
    };
  } catch (error) {
    console.error('Failed to upload image:', error);
    return {
      error: 'Failed to upload image. Please try again.',
    };
  }
}

export async function deleteImage(url: string): Promise<boolean> {
  try {
    await del(url);
    return true;
  } catch (error) {
    console.error('Failed to delete image:', error);
    return false;
  }
}
