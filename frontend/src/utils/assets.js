/**
 * Utility to resolve relative asset URLs (like /uploads/...) to absolute URLs
 * pointing to the backend host (Render) when running in production, or relative when local.
 */
export const resolveAssetUrl = (url) => {
  if (!url || typeof url !== 'string') return '';
  const trimmed = url.trim();
  if (
    trimmed.startsWith('data:') ||
    trimmed.startsWith('blob:') ||
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://')
  ) {
    return trimmed;
  }

  if (trimmed.startsWith('/uploads/') || trimmed.startsWith('uploads/')) {
    const rawBase = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || '';
    if (rawBase && rawBase !== '/api') {
      const serverBase = rawBase.replace(/\/api\/?$/, '').replace(/\/+$/, '');
      const cleanPath = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
      return `${serverBase}${cleanPath}`;
    }
  }

  return trimmed;
};

/**
 * Compresses an image file in-browser to a compact Base64 Data URL (JPEG, max 500px, 0.85 quality).
 * Produces ~30-60KB image that stores directly in MySQL LONGTEXT without quality loss.
 */
export const compressImage = (file, maxWidth = 500, quality = 0.85) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxWidth) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxWidth) / height);
            height = maxWidth;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error('Failed to parse image for compression'));
      img.src = e.target.result;
    };
    reader.onerror = () => reject(new Error('Failed to read image file'));
    reader.readAsDataURL(file);
  });
};

/**
 * Reads a document (such as a PDF resume) and converts it to a Base64 Data URL.
 * Allows storing PDF documents directly inside MySQL LONGTEXT for 100% cloud persistence.
 */
export const readFileAsDataUrl = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(new Error('Failed to read document file: ' + (err?.message || '')));
    reader.readAsDataURL(file);
  });
};

