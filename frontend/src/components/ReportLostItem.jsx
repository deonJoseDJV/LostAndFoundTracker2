import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { itemService } from '../services/itemService';

const ReportLostItem = () => {
    const [formData, setFormData] = useState({
        itemName: '',
        category: '',
        description: '',
        locationLost: '',
        dateLost: '',
        color: '',
        brand: ''
    });
     const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    const { user } = useAuth();
    const navigate = useNavigate();

    const categories = [
        'Electronics', 'Books', 'Clothing', 'Accessories', 
        'ID Cards', 'Keys', 'Bags', 'Water Bottles', 'Others'
    ];
     const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            navigate('/login');
            return;
        }

        setLoading(true);
        setError('');

     
        try {
            const itemData = new FormData();
            itemData.append('itemName', formData.itemName);
            itemData.append('category', formData.category);
            itemData.append('description', formData.description);
            itemData.append('locationLost', formData.locationLost);
            itemData.append('dateLost', new Date(formData.dateLost).toISOString());
            itemData.append('color', formData.color);
            itemData.append('brand', formData.brand);
            if (image) {
                itemData.append('image', image);
            }

            console.log('Reporting lost item:', formData);
            
            // Call API to report lost item
            const result = await itemService.reportLost(itemData);
            
            console.log('Item reported successfully:', result);
            alert('Item reported successfully! Our team will help you find it.');
            navigate('/lost-items');
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
                    <p className="text-gray-600 mb-4">You need to be logged in to report a lost item.</p>
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
                <h2 className="text-3xl font-bold text-center mb-6">Report Lost Item</h2>
                <p className="text-gray-600 text-center mb-8">Help us help you find your lost item quickly</p>
                
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Item Name */}
                        <div className="md:col-span-2">
                            <label className="block text-gray-700 mb-2">Item Photo (Optional)</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {imagePreview && (
                                <div className="mt-4">
                                    <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg" />
                                </div>
                            )}
                            <label className="block text-gray-700 mb-2">Item Name *</label>
                            <input
                                type="text"
                                name="itemName"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.itemName}
                                onChange={handleChange}
                                placeholder="e.g., iPhone 13, Calculus Textbook, Wallet"
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

                        {/* Lost Date */}
                        <div>
                            <label className="block text-gray-700 mb-2">Lost Date *</label>
                            <input
                                type="datetime-local"
                                name="dateLost"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.dateLost}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block text-gray-700 mb-2">Location Lost *</label>
                            <input
                                type="text"
                                name="locationLost"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.locationLost}
                                onChange={handleChange}
                                placeholder="e.g., Library, Cafeteria, Building A"
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
                                placeholder="Describe your item in detail... (size, distinctive features, contents, etc.)"
                            />
                        </div>
                    </div>

                    <div className="mt-8">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 transition duration-300"
                        >
                            {loading ? 'Reporting Item...' : 'Report Lost Item'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReportLostItem;