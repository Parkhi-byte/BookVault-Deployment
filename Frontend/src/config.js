// Configuration for different environments
const config = {
  development: {
    API_BASE_URL: 'http://localhost:4000',
  },
  production: {
    API_BASE_URL: 'https://your-backend-name.onrender.com', // Update this with your actual Render backend URL
  }
};

// Get current environment
const env = import.meta.env.MODE || 'development';

// Export the appropriate configuration
export const API_BASE_URL = config[env].API_BASE_URL;

export default config[env];
