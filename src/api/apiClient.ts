// src/api/apiClient.ts
import axios from 'axios';

const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: `${backendURL}/api/v1`,
  withCredentials: true
});

export default apiClient;
