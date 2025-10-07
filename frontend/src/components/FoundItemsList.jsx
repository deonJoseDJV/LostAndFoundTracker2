import React, { useState, useEffect } from 'react';
import { itemService } from '../services/itemService';
import { FaSearch, FaFilter, FaCalendarAlt } from 'react-icons/fa';
import ClaimModal from './ClaimModal';

const FoundItemsList = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        search: '',
        category: ''
    });
     const [claimModalOpen, setClaimModalOpen] = useState(false);
    const [selectedFoundItem, setSelectedFoundItem] = useState(null);

    const handleClaimClick = (item) => {
        setSelectedFoundItem(item);
        setClaimModalOpen(true);
    };

    const handleClaimSuccess = () => {
        // Refresh the list or show success message
        window.location.reload(); // Simple refresh for now
    };


    const categories = [
        'Electronics', 'Books', 'Clothing', 'Accessories', 
        'ID Cards', 'Keys', 'Bags', 'Water Bottles', 'Others'
    ];

    useEffect(() => {
        const fetchItems = async () => {
            try {
                setLoading(true);
                const data = await itemService.getFoundItems(filters);
                setItems(data);
            } catch (error) {
                console.error('Error fetching items:', error);
                alert('Failed to load found items');
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
                <div className="text-xl">Loading found items...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Found Items</h1>
                    <p className="text-gray-600">Help reunite found items with their owners</p>
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
                                        const data = await itemService.getFoundItems(filters);
                                        setItems(data);
                                    } catch (error) {
                                        console.error('Error fetching items:', error);
                                        alert('Failed to load found items');
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
                                    <span className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded">
                                        {item.category}
                                    </span>
                                </div>
                                
                                <p className="text-gray-600 mb-4 line-clamp-3">{item.description}</p>
                                
                                <div className="space-y-2 text-sm text-gray-500">
                                    <div className="flex items-center">
                                        <FaCalendarAlt className="mr-2" />
                                        Found on: {formatDate(item.dateFound)}
                                    </div>
                                    <div>📍 {item.locationFound}</div>
                                    {item.color && <div>🎨 Color: {item.color}</div>}
                                    {item.brand && <div>🏷️ Brand: {item.brand}</div>}
                                </div>
                                
                                <div className="mt-4 pt-4 border-t">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-500">
                                            Found by: {item.user?.name}
                                        </span>
                                        <span className="text-xs text-gray-400">
                                            {formatDate(item.createdAt)}
                                        </span>
                                    </div>
                                </div>
                                
                                {!item.isClaimed && (
                                    <div className="mt-4">
                                        <button   onClick={() => handleClaimClick(item)} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                                            I Think This Is Mine!
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                  {/* Claim Modal */}
            <ClaimModal
                foundItem={selectedFoundItem}
                isOpen={claimModalOpen}
                onClose={() => setClaimModalOpen(false)}
                onClaimSuccess={handleClaimSuccess}
            />

                {items.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-gray-400 text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No found items available</h3>
                        <p className="text-gray-500">Try adjusting your filters or check back later.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FoundItemsList;