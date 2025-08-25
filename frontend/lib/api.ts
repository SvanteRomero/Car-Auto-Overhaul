import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  withCredentials: true, // This is crucial for Sanctum to work!
  headers: {
    'Accept': 'application/json',
  },
});

// You can add an interceptor here later to automatically add the auth token to every request

export default api;