// API Configuration
// To use environment variables, create a .env.local file with:
// NEXT_PUBLIC_API_BASE_URL=

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.aioftheworld.in/api/v1';

export const API_ENDPOINTS = {
    // Authentication
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    PROFILE: `${API_BASE_URL}/profile`,
    UPDATE_INTERESTS: `${API_BASE_URL}/profile/interests`,

    // OTP Authentication
    SEND_OTP: `${API_BASE_URL}/auth/send-otp`,
    VERIFY_OTP: `${API_BASE_URL}/auth/verify-otp`,
    SIGNUP_WITH_OTP: `${API_BASE_URL}/auth/signup-with-otp`,
    RESET_PASSWORD: `${API_BASE_URL}/auth/reset-password`,

    // Tags
    TAGS: `${API_BASE_URL}/tags`,
    TAG_BY_ID: (id) => `${API_BASE_URL}/tags/${id}`,
    TAG_SEARCH: `${API_BASE_URL}/tags/search`,
    TAG_STATS: `${API_BASE_URL}/tags/stats`,

    // Images
    IMAGES: `${API_BASE_URL}/images`,
    IMAGES_UPLOAD: `${API_BASE_URL}/images/upload`,

    // GIFs
    GIFS: `${API_BASE_URL}/gifs`,
    GIFS_UPLOAD: `${API_BASE_URL}/gifs/upload`,

    // Videos
    VIDEOS: `${API_BASE_URL}/videos`,
    VIDEOS_UPLOAD: `${API_BASE_URL}/videos/upload`,

    // Admin - Tags
    ADMIN_TAGS: `${API_BASE_URL}/admin/tags`,
    ADMIN_TAG_BY_ID: (id) => `${API_BASE_URL}/admin/tags/${id}`,

    // Admin - Users
    ADMIN_USERS: `${API_BASE_URL}/admin/users`,

    // Admin - Images
    ADMIN_IMAGES: `${API_BASE_URL}/admin/images`,

    // Admin - GIFs
    ADMIN_GIFS: `${API_BASE_URL}/admin/gifs`,

    // Admin - Videos
    ADMIN_VIDEOS: `${API_BASE_URL}/admin/videos`,
};

export default API_BASE_URL;
