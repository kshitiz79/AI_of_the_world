import { API_ENDPOINTS } from './config';

// Helper to get auth token
const getAuthToken = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('authToken');
    }
    return null;
};

// GIF API calls
export const gifsAPI = {
    // Upload GIF
    uploadGIF: async (formData) => {
        const token = getAuthToken();
        if (!token) {
            throw new Error('Authentication required');
        }

        const response = await fetch(API_ENDPOINTS.GIFS_UPLOAD, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData, // FormData object
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to upload GIF');
        }

        return data;
    },

    // Get all GIFs
    getAllGIFs: async (filters = {}) => {
        const params = new URLSearchParams();
        if (filters.status) params.append('status', filters.status);
        if (filters.user_id) params.append('user_id', filters.user_id);
        if (filters.is_featured !== undefined) params.append('is_featured', filters.is_featured);

        const url = `${API_ENDPOINTS.GIFS}${params.toString() ? '?' + params.toString() : ''}`;

        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to fetch GIFs');
        }

        return data;
    },

    // Get GIF by ID
    getGIFById: async (id) => {
        const response = await fetch(`${API_ENDPOINTS.GIFS}/${id}`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to fetch GIF');
        }

        return data;
    },

    // Delete GIF
    deleteGIF: async (id) => {
        const token = getAuthToken();
        if (!token) {
            throw new Error('Authentication required');
        }

        const response = await fetch(`${API_ENDPOINTS.GIFS}/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to delete GIF');
        }

        return data;
    },

    // Admin: Approve GIF
    approveGIF: async (id) => {
        const token = getAuthToken();
        if (!token) {
            throw new Error('Authentication required');
        }

        const response = await fetch(`${API_ENDPOINTS.ADMIN_GIFS}/${id}/approve`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to approve GIF');
        }

        return data;
    },

    // Admin: Reject GIF
    rejectGIF: async (id) => {
        const token = getAuthToken();
        if (!token) {
            throw new Error('Authentication required');
        }

        const response = await fetch(`${API_ENDPOINTS.ADMIN_GIFS}/${id}/reject`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to reject GIF');
        }

        return data;
    },

    // Admin: Publish GIF
    publishGIF: async (id) => {
        const token = getAuthToken();
        if (!token) {
            throw new Error('Authentication required');
        }

        const response = await fetch(`${API_ENDPOINTS.ADMIN_GIFS}/${id}/publish`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to publish GIF');
        }

        return data;
    },

    // Admin: Unpublish GIF
    unpublishGIF: async (id) => {
        const token = getAuthToken();
        if (!token) {
            throw new Error('Authentication required');
        }

        const response = await fetch(`${API_ENDPOINTS.ADMIN_GIFS}/${id}/unpublish`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to unpublish GIF');
        }

        return data;
    },
};
