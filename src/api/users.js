import { API_ENDPOINTS } from './config';

// Helper to get auth token
const getAuthToken = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('authToken');
    }
    return null;
};

// Users API calls (Admin only)
export const usersAPI = {
    // Get all users
    getAllUsers: async (filters = {}) => {
        const token = getAuthToken();
        if (!token) {
            throw new Error('Authentication required');
        }

        const params = new URLSearchParams();
        if (filters.role) params.append('role', filters.role);
        if (filters.is_active !== undefined) params.append('is_active', filters.is_active);

        const url = `${API_ENDPOINTS.ADMIN_USERS}${params.toString() ? '?' + params.toString() : ''}`;

        try {
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const text = await response.text();
            let data;

            try {
                data = JSON.parse(text);
            } catch (e) {
                console.error('Failed to parse JSON:', text);
                throw new Error('Invalid response from server');
            }

            if (!response.ok) {
                throw new Error(data.error || 'Failed to fetch users');
            }

            return data;
        } catch (error) {
            if (error.message === 'Invalid response from server') {
                throw error;
            }
            throw new Error('Failed to connect to server');
        }
    },

    // Get user by ID
    getUserById: async (id) => {
        const token = getAuthToken();
        if (!token) {
            throw new Error('Authentication required');
        }

        const response = await fetch(`${API_ENDPOINTS.ADMIN_USERS}/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to fetch user');
        }

        return data;
    },

    // Update user status
    updateUserStatus: async (id, isActive) => {
        const token = getAuthToken();
        if (!token) {
            throw new Error('Authentication required');
        }

        const response = await fetch(`${API_ENDPOINTS.ADMIN_USERS}/${id}/status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ is_active: isActive }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to update user status');
        }

        return data;
    },

    // Delete user
    deleteUser: async (id) => {
        const token = getAuthToken();
        if (!token) {
            throw new Error('Authentication required');
        }

        const response = await fetch(`${API_ENDPOINTS.ADMIN_USERS}/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to delete user');
        }

        return data;
    },

    // Get user statistics
    getUserStats: async () => {
        const token = getAuthToken();
        if (!token) {
            throw new Error('Authentication required');
        }

        try {
            const response = await fetch(`${API_ENDPOINTS.ADMIN_USERS}/stats`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const text = await response.text();
            let data;

            try {
                data = JSON.parse(text);
            } catch (e) {
                console.error('Failed to parse JSON:', text);
                throw new Error('Invalid response from server');
            }

            if (!response.ok) {
                throw new Error(data.error || 'Failed to fetch user stats');
            }

            return data;
        } catch (error) {
            if (error.message === 'Invalid response from server') {
                throw error;
            }
            throw new Error('Failed to connect to server');
        }
    },
};
