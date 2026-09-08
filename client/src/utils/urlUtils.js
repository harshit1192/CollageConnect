const API_BASE_URL = 'https://collageconnect.onrender.com';

export const resolveImageUrl = (path) => {
  if (!path) return null;
  // If it's already a full URL (http/https), return as is
  if (path.startsWith('http')) return path;

  // If it's a relative path starting with /uploads, prepend the base URL
  if (path.startsWith('/uploads')) {
    return `${API_BASE_URL}${path}`;
  }

  return path;
};
