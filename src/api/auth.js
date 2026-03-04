import { API_ENDPOINTS } from './config';

// Helper function to get auth token from localStorage
const getAuthToken = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('authToken');
    }
    return null;
};

// Helper function to set auth token
export const setAuthToken = (token) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('authToken', token);
    }
};

// Helper function to remove auth token
export const removeAuthToken = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
    }
};

// Helper function to get user from localStorage
export const getUser = () => {
    if (typeof window !== 'undefined') {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }
    return null;
};

// Helper function to set user
export const setUser = (user) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(user));
    }
};

// Authentication API calls
export const authAPI = {
    // Login
    login: async (email, password) => {
        const response = await fetch(API_ENDPOINTS.LOGIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Login failed');
        }

        // Save token and user to localStorage
        if (data.success && data.data) {
            setAuthToken(data.data.token);
            setUser(data.data.user);
        }

        return data;
    },

    // Register
    register: async (username, email, password, full_name) => {
        const response = await fetch(API_ENDPOINTS.REGISTER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password, full_name }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Registration failed');
        }

        // Save token and user to localStorage
        if (data.success && data.data) {
            setAuthToken(data.data.token);
            setUser(data.data.user);
        }

        return data;
    },

    // Get Profile
    getProfile: async () => {
        const token = getAuthToken();
        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await fetch(API_ENDPOINTS.PROFILE, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to fetch profile');
        }

        return data;
    },

    // Logout
    logout: () => {
        removeAuthToken();
    },

    // Check if user is authenticated
    isAuthenticated: () => {
        return !!getAuthToken();
    },

    // Check if user is admin
    isAdmin: () => {
        const user = getUser();
        return user && user.role === 'admin';
    },
};
