import { API_ENDPOINTS } from './config';

// Helper to get auth token
const getAuthToken = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('authToken');
    }
    return null;
};

// Images API calls
export const imagesAPI = {
    // Upload image
    uploadImage: async (formData) => {
        const token = getAuthToken();
        if (!token) {
            throw new Error('Authentication required');
        }

        const response = await fetch(API_ENDPOINTS.IMAGES_UPLOAD, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData, // FormData object
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to upload image');
        }

        return data;
    },

    // Get all images
    getAllImages: async (filters = {}) => {
        const params = new URLSearchParams();
        if (filters.status) params.append('status', filters.status);
        if (filters.user_id) params.append('user_id', filters.user_id);
        if (filters.is_featured !== undefined) params.append('is_featured', filters.is_featured);

        const url = `${API_ENDPOINTS.IMAGES}${params.toString() ? '?' + params.toString() : ''}`;

        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to fetch images');
        }

        return data;
    },

    // Get image by ID
    getImageById: async (id) => {
        const response = await fetch(`${API_ENDPOINTS.IMAGES}/${id}`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to fetch image');
        }

        return data;
    },

    // Delete image
    deleteImage: async (id) => {
        const token = getAuthToken();
        if (!token) {
            throw new Error('Authentication required');
        }

        const response = await fetch(`${API_ENDPOINTS.IMAGES}/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to delete image');
        }

        return data;
    },

    // Admin: Approve image
    approveImage: async (id) => {
        const token = getAuthToken();
        if (!token) {
            throw new Error('Authentication required');
        }

        const response = await fetch(`${API_ENDPOINTS.ADMIN_IMAGES}/${id}/approve`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to approve image');
        }

        return data;
    },

    // Admin: Reject image
    rejectImage: async (id) => {
        const token = getAuthToken();
        if (!token) {
            throw new Error('Authentication required');
        }

        const response = await fetch(`${API_ENDPOINTS.ADMIN_IMAGES}/${id}/reject`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to reject image');
        }

        return data;
    },

    // Admin: Publish image
    publishImage: async (id) => {
        const token = getAuthToken();
        if (!token) {
            throw new Error('Authentication required');
        }

        const response = await fetch(`${API_ENDPOINTS.ADMIN_IMAGES}/${id}/publish`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to publish image');
        }

        return data;
    },

    // Admin: Unpublish image
    unpublishImage: async (id) => {
        const token = getAuthToken();
        if (!token) {
            throw new Error('Authentication required');
        }

        const response = await fetch(`${API_ENDPOINTS.ADMIN_IMAGES}/${id}/unpublish`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to unpublish image');
        }

        return data;
    },

    // Admin: Update image
    updateImage: async (id, updates) => {
        const token = getAuthToken();
        if (!token) {
            throw new Error('Authentication required');
        }

        const response = await fetch(`${API_ENDPOINTS.ADMIN_IMAGES}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(updates),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to update image');
        }

        return data;
    },
};
