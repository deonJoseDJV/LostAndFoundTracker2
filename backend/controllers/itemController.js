const LostItem = require('../models/LostItem');
const FoundItem = require('../models/FoundItem');
const { calculateSimilarity } = require('../utils/matchingService');

// Report lost item
const reportLost = async (req, res) => {
    try {
        const { itemName, category, description, locationLost, dateLost, color, brand } = req.body;
        
        const lostItem = await LostItem.create({
            user: req.userId,
            itemName,
            category,
            description,
            locationLost,
            dateLost,
            color,
            brand,
            image: req.file ? `/uploads/${req.file.filename}` : null
        });

        res.status(201).json(lostItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Report found item
const reportFound = async (req, res) => {
    try {
        const { itemName, category, description, locationFound, dateFound, color, brand } = req.body;
        
        const foundItem = await FoundItem.create({
            user: req.userId,
            itemName,
            category,
            description,
            locationFound,
            dateFound,
            color,
            brand,
            image: req.file ? `/uploads/${req.file.filename}` : null
        });

        res.status(201).json(foundItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all lost items
const getLostItems = async (req, res) => {
    try {
        const { category, search } = req.query;
        let query = { isFound: false };
        
        if (category) query.category = category;
        if (search) query.itemName = { $regex: search, $options: 'i' };
        
        const items = await LostItem.find(query).populate('user', 'name college').sort({ createdAt: -1 });
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all found items
const getFoundItems = async (req, res) => {
    try {
        const { category, search } = req.query;
        let query = { isClaimed: false };
        
        if (category) query.category = category;
        if (search) query.itemName = { $regex: search, $options: 'i' };
        
        const items = await FoundItem.find(query).populate('user', 'name college').sort({ createdAt: -1 });
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Claim a found item
const claimFoundItem = async (req, res) => {
    try {
        const { foundItemId } = req.params;
        const { lostItemId } = req.body;

        const foundItem = await FoundItem.findById(foundItemId);
        const lostItem = await LostItem.findById(lostItemId);

        if (!foundItem || !lostItem) {
            return res.status(404).json({ message: 'Item not found' });
        }

        if (foundItem.isClaimed) {
            return res.status(400).json({ message: 'Item already claimed' });
        }

        // Calculate similarity score
        const similarityScore = calculateSimilarity(lostItem, foundItem);
        
        // Create claim request
        const claimRequest = {
            lostItem: lostItemId,
            claimedBy: req.userId,
            similarityScore: similarityScore,
            status: 'pending',
            claimedAt: new Date()
        };

        // Add claim to found item
        foundItem.claimRequests = foundItem.claimRequests || [];
        foundItem.claimRequests.push(claimRequest);
        
        await foundItem.save();

        // Notify the finder about the claim
        console.log(`Claim request from ${req.userId} for found item ${foundItemId} with ${similarityScore * 100}% match`);

        res.json({
            message: 'Claim request submitted successfully',
            similarityScore: similarityScore,
            matchPercentage: Math.round(similarityScore * 100)
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get potential matches for a lost item
const getMatchesForLostItem = async (req, res) => {
    try {
        const { lostItemId } = req.params;
        
        const lostItem = await LostItem.findById(lostItemId);
        const foundItems = await FoundItem.find({ isClaimed: false });

        const matches = foundItems.map(foundItem => {
            const similarityScore = calculateSimilarity(lostItem, foundItem);
            return {
                foundItem: foundItem,
                similarityScore: similarityScore,
                matchPercentage: Math.round(similarityScore * 100)
            };
        }).filter(match => match.similarityScore > 0.3) // 30% minimum threshold
          .sort((a, b) => b.similarityScore - a.similarityScore);

        res.json(matches);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get user's lost items for claiming
const getUserLostItems = async (req, res) => {
    try {
        const lostItems = await LostItem.find({ 
            user: req.userId,
            isFound: false 
        });
        res.json(lostItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { 
    reportLost, 
    reportFound, 
    getLostItems, 
    getFoundItems,
    claimFoundItem,
    getMatchesForLostItem,
    getUserLostItems
};