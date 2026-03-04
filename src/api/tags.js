import { API_ENDPOINTS } from './config';

// Helper to get auth token
const getAuthToken = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('authToken');
    }
    return null;
};

// Tags API calls
export const tagsAPI = {
    // Get all tags
    getAllTags: async (filters = {}) => {
        const params = new URLSearchParams();
        if (filters.category) params.append('category', filters.category);
        if (filters.is_active !== undefined) params.append('is_active', filters.is_active);

        const url = `${API_ENDPOINTS.TAGS}${params.toString() ? '?' + params.toString() : ''}`;

        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to fetch tags');
        }

        return data;
    },

    // Get tag by ID
    getTagById: async (id) => {
        const response = await fetch(API_ENDPOINTS.TAG_BY_ID(id));
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to fetch tag');
        }

        return data;
    },

    // Search tags
    searchTags: async (query, limit = 10) => {
        const params = new URLSearchParams({ q: query, limit });
        const response = await fetch(`${API_ENDPOINTS.TAG_SEARCH}?${params.toString()}`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to search tags');
        }

        return data;
    },

    // Get tag statistics
    getTagStats: async () => {
        const response = await fetch(API_ENDPOINTS.TAG_STATS);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to fetch tag stats');
        }

        return data;
    },

    // Create tag (Admin only)
    createTag: async (tagData) => {
        const token = getAuthToken();
        if (!token) {
            throw new Error('Authentication required');
        }

        const response = await fetch(API_ENDPOINTS.ADMIN_TAGS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(tagData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to create tag');
        }

        return data;
    },

    // Update tag (Admin only)
    updateTag: async (id, tagData) => {
        const token = getAuthToken();
        if (!token) {
            throw new Error('Authentication required');
        }

        const response = await fetch(API_ENDPOINTS.ADMIN_TAG_BY_ID(id), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(tagData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to update tag');
        }

        return data;
    },

    // Delete tag (Admin only)
    deleteTag: async (id) => {
        const token = getAuthToken();
        if (!token) {
            throw new Error('Authentication required');
        }

        const response = await fetch(API_ENDPOINTS.ADMIN_TAG_BY_ID(id), {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to delete tag');
        }

        return data;
    },
};
