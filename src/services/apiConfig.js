// Central API base configuration for frontend calls
// Set VITE_FRONTEND_URL in your environment (Vite) or it will default to the provided URL
export const API_BASE = import.meta.env.VITE_FRONTEND_URL || import.meta.env.VITE_API_BASE || import.meta.env.VITE_BACKEND_URL || 'https://varallocms.vercel.app';

if (typeof window !== 'undefined') {
  console.log('🌐 API_BASE:', API_BASE);
}

export default API_BASE;
