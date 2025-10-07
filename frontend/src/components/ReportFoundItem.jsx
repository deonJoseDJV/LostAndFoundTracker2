import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { itemService } from '../services/itemService';

const ReportFoundItem = () => {
    const [formData, setFormData] = useState({
        itemName: '',
        category: '',
        description: '',
        locationFound: '',
        dateFound: '',
        color: '',
        brand: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    const { user } = useAuth();
    const navigate = useNavigate();

    const categories = [
        'Electronics', 'Books', 'Clothing', 'Accessories', 
        'ID Cards', 'Keys', 'Bags', 'Water Bottles', 'Others'
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            navigate('/login');
            return;
        }

        setLoading(true);
        setError('');

        try {
            // Prepare data for backend
            const itemData = {
                ...formData,
                dateFound: new Date(formData.dateFound).toISOString()
            };

            console.log('Reporting found item:', itemData);
            
            // Call API to report found item
            const result = await itemService.reportFound(itemData);
            
            console.log('Item reported successfully:', result);
            alert('Found item reported successfully! Thank you for helping.');
            navigate('/found-items'); // Redirect to found items list
        } catch (err) {
            console.error('Reporting error:', err);
            setError(err.message || 'Failed to report item. Please try again.');
        }
        setLoading(false);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Please Login First</h2>
                    <p className="text-gray-600 mb-4">You need to be logged in to report a found item.</p>
                    <button 
                        onClick={() => navigate('/login')}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg"
                    >
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-3xl font-bold text-center mb-6">Report Found Item</h2>
                <p className="text-gray-600 text-center mb-8">Help reunite lost items with their owners</p>
                
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Item Name */}
                        <div className="md:col-span-2">
                            <label className="block text-gray-700 mb-2">Item Name *</label>
                            <input
                                type="text"
                                name="itemName"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.itemName}
                                onChange={handleChange}
                                placeholder="e.g., iPhone, Wallet, Textbook, Keys"
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-gray-700 mb-2">Category *</label>
                            <select
                                name="category"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.category}
                                onChange={handleChange}
                            >
                                <option value="">Select Category</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        {/* Color */}
                        <div>
                            <label className="block text-gray-700 mb-2">Color</label>
                            <input
                                type="text"
                                name="color"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.color}
                                onChange={handleChange}
                                placeholder="e.g., Black, Red, Blue"
                            />
                        </div>

                        {/* Brand */}
                        <div>
                            <label className="block text-gray-700 mb-2">Brand</label>
                            <input
                                type="text"
                                name="brand"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.brand}
                                onChange={handleChange}
                                placeholder="e.g., Apple, Nike, Samsung"
                            />
                        </div>

                        {/* Found Date */}
                        <div>
                            <label className="block text-gray-700 mb-2">Found Date *</label>
                            <input
                                type="datetime-local"
                                name="dateFound"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.dateFound}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block text-gray-700 mb-2">Location Found *</label>
                            <input
                                type="text"
                                name="locationFound"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.locationFound}
                                onChange={handleChange}
                                placeholder="e.g., Library, Cafeteria, Building A, Parking Lot"
                            />
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2">
                            <label className="block text-gray-700 mb-2">Description *</label>
                            <textarea
                                name="description"
                                required
                                rows="4"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Describe the item you found... (condition, distinctive features, where exactly you found it)"
                            />
                        </div>
                    </div>

                    <div className="mt-8">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 transition duration-300"
                        >
                            {loading ? 'Reporting Item...' : 'Report Found Item'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReportFoundItem;