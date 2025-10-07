import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaShieldAlt, FaUser, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
    const { user, logout } = useAuth();
    const location = useLocation();

    if (location.pathname === '/') return null; // Hide navbar on home page

    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <Link to="/" className="flex items-center">
                        <FaShieldAlt className="text-2xl text-blue-600 mr-2" />
                        <span className="text-xl font-bold text-gray-900">SafeReturn</span>
                    </Link>
                    
                    <div className="flex items-center space-x-4">
                        {user ? (
                            <>
                                <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">
                                    Dashboard
                                </Link>
                                <div className="flex items-center space-x-2">
                                    <FaUser className="text-gray-500" />
                                    <span className="text-gray-700">Hello, {user.name}</span>
                                </div>
                                <button 
                                    onClick={logout}
                                    className="flex items-center space-x-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                                >
                                    <FaSignOutAlt />
                                    <span>Logout</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium">
                                    Login
                                </Link>
                                <Link to="/register" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-full font-medium hover:from-blue-700 hover:to-indigo-700 transition-all">
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
