import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaBullhorn, FaClock, FaIdCard, FaUsers, FaShieldAlt, FaEye, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext'; // Add this import

const Home = () => {
    const { user, logout } = useAuth(); // Add this

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Navigation - FIXED */}
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center">
                            <FaShieldAlt className="text-3xl text-blue-600 mr-3" />
                            <span className="text-2xl font-bold text-gray-900">SafeReturn</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            {user ? (
                                // Show when user is logged in
                                <>
                                    <div className="flex items-center space-x-2">
                                        <FaUser className="text-gray-600" />
                                        <span className="text-gray-700">Hello, {user.name}</span>
                                    </div>
                                    <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">
                                        Dashboard
                                    </Link>
                                    <button 
                                        onClick={logout}
                                        className="flex items-center space-x-1 bg-red-500 text-white px-4 py-2 rounded-full font-medium hover:bg-red-600 transition-all duration-300"
                                    >
                                        <FaSignOutAlt />
                                        <span>Logout</span>
                                    </button>
                                </>
                            ) : (
                                // Show when user is not logged in
                                <>
                                    <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium">
                                        Login
                                    </Link>
                                    <Link to="/register" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-full font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-300">
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Rest of your Home.jsx remains exactly the same */}
            <section className="relative py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                        Lost on Campus? 
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                            We've Got Your Back!
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                        Find what you lost, fast! Our campus network helps students recover lost items 
                        with incredible speed and efficiency.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                        <Link to="/report-lost" className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                            Report Lost Item
                        </Link>
                        <Link to="/report-found" className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105">
                            Report Found Items
                        </Link>
                    </div>
                    
                    {/* Quick Browse Section */}
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto mb-16">
                        <div className="flex items-center justify-center mb-3">
                            <FaEye className="text-2xl text-blue-600 mr-2" />
                            <h3 className="text-lg font-semibold text-gray-800">Quick Browse</h3>
                        </div>
                        <div className="flex gap-3 justify-center">
                            <Link to="/lost-items" className="bg-blue-500/90 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-600 transition duration-300">
                                View Lost Items
                            </Link>
                            <Link to="/found-items" className="bg-purple-500/90 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-600 transition duration-300">
                                View Found Items
                            </Link>
                        </div>
                    </div>
                    
                    {/* Stats Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 mx-auto">
                                <FaClock className="text-2xl text-blue-600" />
                            </div>
                            <div className="text-3xl font-bold text-gray-900 mb-2">2h</div>
                            <div className="text-gray-600">Average Recovery Time</div>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4 mx-auto">
                                <FaIdCard className="text-2xl text-green-600" />
                            </div>
                            <div className="text-3xl font-bold text-gray-900 mb-2">95%</div>
                            <div className="text-gray-600">Success Rate for ID Cards</div>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4 mx-auto">
                                <FaUsers className="text-2xl text-purple-600" />
                            </div>
                            <div className="text-3xl font-bold text-gray-900 mb-2">500+</div>
                            <div className="text-gray-600">Items Reunited This Month</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
                        <p className="text-xl text-gray-600">Simple, fast, and effective item recovery</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center p-6">
                            <div className="flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-4 mx-auto">
                                <FaBullhorn className="text-3xl text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">1. Report Lost Item</h3>
                            <p className="text-gray-600">Quickly report your lost item with details and photos. Our system instantly notifies the campus network.</p>
                        </div>
                        
                        <div className="text-center p-6">
                            <div className="flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4 mx-auto">
                                <FaSearch className="text-3xl text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">2. Smart Matching</h3>
                            <p className="text-gray-600">Our AI-powered system matches your report with found items across campus in real-time.</p>
                        </div>
                        
                        <div className="text-center p-6">
                            <div className="flex items-center justify-center w-20 h-20 bg-purple-100 rounded-full mb-4 mx-auto">
                                <FaUsers className="text-3xl text-purple-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">3. Quick Recovery</h3>
                            <p className="text-gray-600">Connect with the finder and arrange pickup. Most items are returned within hours.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-white mb-4">Ready to Find Your Lost Items?</h2>
                    <p className="text-xl text-blue-100 mb-8">Join thousands of students who have successfully recovered their belongings.</p>
                    <Link to="/register" className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                        Start Your Search Today
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="flex items-center justify-center mb-6">
                        <FaShieldAlt className="text-2xl text-blue-400 mr-3" />
                        <span className="text-2xl font-bold">SafeReturn</span>
                    </div>
                    <p className="text-gray-400 mb-4">Campus Lost & Found Platform</p>
                    <p className="text-gray-500 text-sm">© 2025 SafeReturn. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;