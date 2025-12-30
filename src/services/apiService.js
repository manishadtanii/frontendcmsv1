// API Service - Frontend to Backend Communication

export const API_BASE_URL = 'http://localhost:3000/api';

// page slug endpoints
export const pageAPI = {
    getPages: async () => {
        try {
            console.log('📄 Fetching pages from backend...')
            const response = await fetch(`${API_BASE_URL}/pages/`, {
                method: 'GET',
                credentials: 'include', 
                })
                const data = await response.json()
                
                console.log('📄 Pages fetched:', data);
                return data;
            } catch (error) {
                console.error('❌ Error fetching pages:', error);
                throw error;
            }   
    },

    getPageBySlug: async (slug) => {
        try {
            console.log(`📄 Fetching page with slug: ${slug} from backend...`)
            const response = await fetch(`${API_BASE_URL}/pages/${slug}`, {
                method: 'GET',
                credentials: 'include', 
                })
                const data = await response.json();
                console.log(`📄 Page fetched:`, data)
                return data;
            } catch (error) {
                console.error('❌ Error fetching page by slug:', error);
                throw error;
            }
    },
};


export default {
//   authAPI,
  pageAPI,
//   testConnection,
};
