import React, { useState, useEffect } from 'react';
import { itemService } from '../services/itemService';

const ClaimModal = ({ foundItem, isOpen, onClose, onClaimSuccess }) => {
    const [userLostItems, setUserLostItems] = useState([]);
    const [selectedLostItem, setSelectedLostItem] = useState('');
    const [loading, setLoading] = useState(false);
    const [matches, setMatches] = useState([]);
    const [showMatches, setShowMatches] = useState(false);

    useEffect(() => {
        if (isOpen) {
            fetchUserLostItems();
        }
    }, [isOpen]);

    const fetchUserLostItems = async () => {
        try {
            const items = await itemService.getUserLostItems();
            setUserLostItems(items);
        } catch (error) {
            console.error('Error fetching user lost items:', error);
        }
    };

    const handleCheckMatches = async () => {
        if (!selectedLostItem) return;
        
        try {
            setLoading(true);
            const matches = await itemService.getMatchesForLostItem(selectedLostItem);
            setMatches(matches);
            setShowMatches(true);
        } catch (error) {
            console.error('Error checking matches:', error);
            alert('Failed to check matches');
        }
        setLoading(false);
    };

    const handleClaim = async () => {
        if (!selectedLostItem) {
            alert('Please select which item you lost');
            return;
        }

        try {
            setLoading(true);
            const result = await itemService.claimFoundItem(foundItem._id, selectedLostItem);
            
            alert(`Claim submitted! Match confidence: ${result.matchPercentage}%`);
            onClaimSuccess();
            onClose();
        } catch (error) {
            console.error('Error claiming item:', error);
            alert(error.message || 'Failed to submit claim');
        }
        setLoading(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <h2 className="text-2xl font-bold mb-4">Claim This Item</h2>
                
                <p className="text-gray-600 mb-4">
                    Which of your lost items matches this found item?
                </p>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Select Your Lost Item:</label>
                    <select
                        value={selectedLostItem}
                        onChange={(e) => setSelectedLostItem(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                        <option value="">Choose a lost item</option>
                        {userLostItems.map(item => (
                            <option key={item._id} value={item._id}>
                                {item.itemName} - {item.category}
                            </option>
                        ))}
                    </select>
                </div>

                {selectedLostItem && (
                    <button
                        onClick={handleCheckMatches}
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg mb-4 hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? 'Checking...' : 'Check Match Confidence'}
                    </button>
                )}

                {showMatches && matches.length > 0 && (
                    <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold mb-2">Match Results:</h3>
                        {matches.map((match, index) => (
                            <div key={index} className="flex justify-between items-center mb-2">
                                <span>{match.foundItem.itemName}</span>
                                <span className={`font-bold ${
                                    match.matchPercentage > 70 ? 'text-green-600' : 
                                    match.matchPercentage > 50 ? 'text-yellow-600' : 'text-red-600'
                                }`}>
                                    {match.matchPercentage}% match
                                </span>
                            </div>
                        ))}
                    </div>
                )}

                <div className="flex gap-3">
                    <button
                        onClick={handleClaim}
                        disabled={loading || !selectedLostItem}
                        className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
                    >
                        {loading ? 'Submitting...' : 'Submit Claim'}
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ClaimModal;