import axios from 'axios';

// ✅ Change to port 5000 (where your backend actually runs)
const API_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL
    // ✅ Remove withCredentials: true (not needed for simple CORS)
});

// Add token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers['Content-Type'] = 'application/json';
    return config;
});

export default api;