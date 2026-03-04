# API Integration Setup

## Environment Variables

Create a `.env.local` file in the root of your Next.js project with the following content:

```env
NEXT_PUBLIC_API_BASE_URL=https://api.aioftheworld.in/api/v1
```

This file is gitignored by default, so you'll need to create it manually.

## Quick Setup

1. Create the `.env.local` file:
```bash
echo "NEXT_PUBLIC_API_BASE_URL=https://api.aioftheworld.in/api/v1" > .env.local
```

2. Restart your Next.js development server:
```bash
npm run dev
```

## API Structure

The API integration is organized as follows:

- `src/api/config.js` - API configuration and endpoints
- `src/api/auth.js` - Authentication API calls
- `src/api/tags.js` - Tags API calls

## Usage Examples

### Login
```javascript
import { authAPI } from '@/api/auth';

const handleLogin = async () => {
  try {
    const response = await authAPI.login('admin@aioftheworld.com', 'Admin@123');
    console.log('Logged in:', response.data.user);
  } catch (error) {
    console.error('Login failed:', error.message);
  }
};
```

### Get Tags
```javascript
import { tagsAPI } from '@/api/tags';

const getTags = async () => {
  try {
    const response = await tagsAPI.getAllTags();
    console.log('Tags:', response.data);
  } catch (error) {
    console.error('Failed to fetch tags:', error.message);
  }
};
```

### Create Tag (Admin only)
```javascript
import { tagsAPI } from '@/api/tags';

const createTag = async () => {
  try {
    const response = await tagsAPI.createTag({
      name: 'Neon',
      category: 'Color',
      description: 'Bright neon colors'
    });
    console.log('Tag created:', response.data);
  } catch (error) {
    console.error('Failed to create tag:', error.message);
  }
};
```

## Authentication Flow

1. User logs in via `/signin` page
2. JWT token is stored in localStorage
3. Token is automatically included in authenticated API calls
4. User is redirected to appropriate dashboard (admin or user)

## Demo Credentials

- **Admin**: admin@aioftheworld.com / Admin@123
- **User**: kshitiz@example.com / Admin@123
