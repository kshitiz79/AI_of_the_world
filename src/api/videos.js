import { API_ENDPOINTS } from './config';

// Helper to get auth token
const getAuthToken = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('authToken');
    }
    return null;
};

// Video API calls
export const videosAPI = {
    // Upload Video
    uploadVideo: async (formData) => {
        const token = getAuthToken();
        if (!token) {
            throw new Error('Authentication required');
        }

        const response = await fetch(API_ENDPOINTS.VIDEOS_UPLOAD, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData, // FormData object
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to upload video');
        }

        return data;
    },

    // Get all Videos
    getAllVideos: async (filters = {}) => {
        const params = new URLSearchParams();
        if (filters.status) params.append('status', filters.status);
        if (filters.user_id) params.append('user_id', filters.user_id);
        if (filters.is_featured !== undefined) params.append('is_featured', filters.is_featured);

        const url = `${API_ENDPOINTS.VIDEOS}${params.toString() ? '?' + params.toString() : ''}`;

        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to fetch videos');
        }

        return data;
    },

    // Get Video by ID
    getVideoById: async (id) => {
        const response = await fetch(`${API_ENDPOINTS.VIDEOS}/${id}`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to fetch video');
        }

        return data;
    },

    // Delete Video
    deleteVideo: async (id) => {
        const token = getAuthToken();
        if (!token) {
            throw new Error('Authentication required');
        }

        const response = await fetch(`${API_ENDPOINTS.VIDEOS}/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to delete video');
        }

        return data;
    },

    // Admin: Approve Video
    approveVideo: async (id) => {
        const token = getAuthToken();
        if (!token) {
            throw new Error('Authentication required');
        }

        const response = await fetch(`${API_ENDPOINTS.ADMIN_VIDEOS}/${id}/approve`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to approve video');
        }

        return data;
    },

    // Admin: Reject Video
    rejectVideo: async (id) => {
        const token = getAuthToken();
        if (!token) {
            throw new Error('Authentication required');
        }

        const response = await fetch(`${API_ENDPOINTS.ADMIN_VIDEOS}/${id}/reject`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to reject video');
        }

        return data;
    },

    // Admin: Publish Video
    publishVideo: async (id) => {
        const token = getAuthToken();
        if (!token) {
            throw new Error('Authentication required');
        }

        const response = await fetch(`${API_ENDPOINTS.ADMIN_VIDEOS}/${id}/publish`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to publish video');
        }

        return data;
    },

    // Admin: Unpublish Video
    unpublishVideo: async (id) => {
        const token = getAuthToken();
        if (!token) {
            throw new Error('Authentication required');
        }

        const response = await fetch(`${API_ENDPOINTS.ADMIN_VIDEOS}/${id}/unpublish`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to unpublish video');
        }

        return data;
    },
};
