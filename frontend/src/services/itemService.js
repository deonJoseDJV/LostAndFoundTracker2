import api from './api';

export const itemService = {
    // Report lost item
     reportLost: async (formData) => {
        try {
            const response = await api.post('/items/lost', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Failed to report lost item';
        }
    },

    // Report found item
  reportFound: async (formData) => {
        try {
            const response = await api.post('/items/found', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Failed to report found item';
        }
    },

    // Get all lost items
    getLostItems: async (filters = {}) => {
        try {
            const response = await api.get('/items/lost', { params: filters });
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Failed to fetch lost items';
        }
    },

    // Get all found items
    getFoundItems: async (filters = {}) => {
        try {
            const response = await api.get('/items/found', { params: filters });
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Failed to fetch found items';
        }
    },
     claimFoundItem: async (foundItemId, lostItemId) => {
        try {
            const response = await api.post(`/items/claim/${foundItemId}`, { lostItemId });
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Failed to claim item';
        }
    },

    // Get matches for a lost item
    getMatchesForLostItem: async (lostItemId) => {
        try {
            const response = await api.get(`/items/matches/${lostItemId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Failed to get matches';
        }
    },

    // Get user's lost items
    getUserLostItems: async () => {
        try {
            const response = await api.get('/items/my-lost-items');
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Failed to get user lost items';
        }
    }
};