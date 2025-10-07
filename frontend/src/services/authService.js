import api from './api';

export const authService = {
    // Register user
    register: async (userData) => {
        try {
            console.log('📨 Sending registration request...', userData);
            const response = await api.post('/auth/register', userData);
            console.log('✅ Registration response:', response.data);
            
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data));
                console.log('💾 User saved to localStorage');
            }
            return response.data;
        } catch (error) {
            console.error('❌ Registration error:', error);
            throw error.response?.data?.message || error.message || 'Registration failed';
        }
    },

    // Login user
    login: async (credentials) => {
        try {
            console.log('📨 Sending login request...', credentials);
            const response = await api.post('/auth/login', credentials);
            console.log('✅ Login response:', response.data);
            
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data));
                console.log('💾 User saved to localStorage');
            }
            return response.data;
        } catch (error) {
            console.error('❌ Login error:', error);
            throw error.response?.data?.message || error.message || 'Login failed';
        }
    },

    // Get current user (removed duplicate)
    getCurrentUser: () => {
        const userStr = localStorage.getItem('user');
        console.log('💾 Reading user from localStorage:', userStr);
        return userStr ? JSON.parse(userStr) : null;
    },

    // Logout user
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    // Check if user is authenticated
    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    }
};