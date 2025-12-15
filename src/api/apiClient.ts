// src/api/apiClient.ts
import axios from 'axios';

const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: `${backendURL}/api/v1`,
  withCredentials: true
});

apiClient.interceptors.request.use(config => {
  if (config.url && config.url.startsWith('/api/')) {
    // Remove the first '/api' to avoid double /api/v1/api/...
    config.url = config.url.replace(/^\/api/, '');
  }
  return config;
}, error => Promise.reject(error));

export default apiClient;
