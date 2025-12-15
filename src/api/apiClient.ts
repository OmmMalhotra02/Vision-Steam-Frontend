import axios from 'axios';

const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: `${backendURL}/api/v1`,
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config: any) => {
    if (!config.headers) config.headers = {};

    // Attach JWT token automatically
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    // Remove leading /api only if it causes double /api/v1/api
    if (config.url && config.url.startsWith('/api/')) {
      config.url = config.url.replace(/^\/api/, ''); // leave /users/login etc.
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
