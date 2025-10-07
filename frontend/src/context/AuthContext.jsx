import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in on app start
        console.log('🔐 AuthProvider mounting - checking for user...');
        const currentUser = authService.getCurrentUser();
        console.log('🔐 User from localStorage:', currentUser);
        
        if (currentUser) {
            setUser(currentUser);
            console.log('✅ User set in AuthContext');
        } else {
            console.log('❌ No user found in localStorage');
        }
        setLoading(false);
    }, []);

    const login = async (credentials) => {
        try {
            console.log('🔐 Attempting login...');
            const userData = await authService.login(credentials);
            console.log('✅ Login successful, user data:', userData);
            setUser(userData);
            return { success: true };
        } catch (error) {
            console.error('❌ Login failed:', error);
            return { success: false, error: error.message || 'Login failed' };
        }
    };

    const register = async (userData) => {
        try {
            console.log('🔐 Attempting registration...');
            const newUser = await authService.register(userData);
            console.log('✅ Registration successful, user data:', newUser);
            setUser(newUser);
            return { success: true };
        } catch (error) {
            console.error('❌ Registration failed:', error);
            return { success: false, error: error.message || 'Registration failed' };
        }
    };

    const logout = () => {
        console.log('🔐 Logging out...');
        authService.logout();
        setUser(null);
    };

    const value = {
        user,
        login,
        register,
        logout,
        loading,
        isAuthenticated: !!user
    };

    console.log('🔐 AuthContext value:', value);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};