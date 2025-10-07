import React, { useState, useEffect } from 'react';
import { itemService } from '../services/itemService';
import { FaSearch, FaFilter, FaCalendarAlt } from 'react-icons/fa';

const LostItemsList = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        search: '',
        category: ''
    });

    const categories = [
        'Electronics', 'Books', 'Clothing', 'Accessories', 
        'ID Cards', 'Keys', 'Bags', 'Water Bottles', 'Others'
    ];

    useEffect(() => {
        const fetchItems = async () => {
            try {
                setLoading(true);
                const data = await itemService.getLostItems(filters);
                setItems(data);
            } catch (error) {
                console.error('Error fetching items:', error);
                alert('Failed to load lost items');
            }
            setLoading(false);
        };
        
        fetchItems();
    }, [filters]);

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-xl">Loading lost items...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Lost Items</h1>
                    <p className="text-gray-600">Help reunite lost items with their owners</p>
                </div>

                {/* Filters */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="relative">
                            <FaSearch className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search items..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                                value={filters.search}
                                onChange={(e) => handleFilterChange('search', e.target.value)}
                            />
                        </div>
                        
                        <select
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            value={filters.category}
                            onChange={(e) => handleFilterChange('category', e.target.value)}
                        >
                            <option value="">All Categories</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                        
                        <button 
                            onClick={() => {
                                const fetchItems = async () => {
                                    try {
                                        setLoading(true);
                                        const data = await itemService.getLostItems(filters);
                                        setItems(data);
                                    } catch (error) {
                                        console.error('Error fetching items:', error);
                                        alert('Failed to load lost items');
                                    }
                                    setLoading(false);
                                };
                                fetchItems();
                            }}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                        >
                            <FaFilter className="inline mr-2" />
                            Apply Filters
                        </button>
                    </div>
                </div>

                {/* Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item) => (
                        <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            {/* ADD IMAGE SECTION HERE */}
                            {item.image && (
                                <div className="w-full h-48 overflow-hidden">
                                    <img 
                                        src={`http://localhost:5000${item.image}`} 
                                        alt={item.itemName}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                            
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="text-xl font-semibold text-gray-900">{item.itemName}</h3>
                                    <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
                                        {item.category}
                                    </span>
                                </div>
                                
                                <p className="text-gray-600 mb-4 line-clamp-3">{item.description}</p>
                                
                                <div className="space-y-2 text-sm text-gray-500">
                                    <div className="flex items-center">
                                        <FaCalendarAlt className="mr-2" />
                                        Lost on: {formatDate(item.dateLost)}
                                    </div>
                                    <div>📍 {item.locationLost}</div>
                                    {item.color && <div>🎨 Color: {item.color}</div>}
                                    {item.brand && <div>🏷️ Brand: {item.brand}</div>}
                                </div>
                                
                                <div className="mt-4 pt-4 border-t">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-500">
                                            Reported by: {item.user?.name}
                                        </span>
                                        <span className="text-xs text-gray-400">
                                            {formatDate(item.createdAt)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {items.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-gray-400 text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No lost items found</h3>
                        <p className="text-gray-500">Try adjusting your filters or check back later.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LostItemsList;