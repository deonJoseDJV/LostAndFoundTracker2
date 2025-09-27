const LostItem = require('../models/LostItem');
const FoundItem = require('../models/FoundItem');
const User = require('../models/User');

// Simple matching algorithm
const findMatches = async (newItem, itemType) => {
    try {
        let matches = [];
        
        if (itemType === 'found') {
            // If new found item, match against lost items
            const lostItems = await LostItem.find({ 
                isFound: false,
                category: newItem.category 
            }).populate('user');
            
            matches = lostItems.filter(lostItem => {
                const similarityScore = calculateSimilarity(lostItem, newItem);
                return similarityScore > 0.6; // 60% match threshold
            });
            
            // Create notifications for lost item owners
            for (const match of matches) {
                await createNotification(
                    match.user._id,
                    `Potential match found for your lost "${match.itemName}"!`,
                    `/found-items`,
                    'match'
                );
            }
            
        } else if (itemType === 'lost') {
            // If new lost item, match against found items
            const foundItems = await FoundItem.find({ 
                isClaimed: false,
                category: newItem.category 
            }).populate('user');
            
            matches = foundItems.filter(foundItem => {
                const similarityScore = calculateSimilarity(newItem, foundItem);
                return similarityScore > 0.6;
            });
            
            // Create notifications for the user who reported the lost item
            for (const match of matches) {
                await createNotification(
                    newItem.user,
                    `Potential match found for your lost "${newItem.itemName}"!`,
                    `/found-items`,
                    'match'
                );
            }
        }
        
        return matches;
    } catch (error) {
        console.error('Matching error:', error);
        return [];
    }
};

// Calculate similarity between lost and found items
const calculateSimilarity = (lostItem, foundItem) => {
    let score = 0;
    let totalCriteria = 0;

    // Category match (30% weight)
    if (lostItem.category === foundItem.category) {
        score += 0.3;
    }
    totalCriteria += 0.3;

    // Item name similarity (40% weight)
    const nameSimilarity = stringSimilarity(lostItem.itemName.toLowerCase(), foundItem.itemName.toLowerCase());
    score += nameSimilarity * 0.4;
    totalCriteria += 0.4;

    // Color match (15% weight)
    if (lostItem.color && foundItem.color && 
        lostItem.color.toLowerCase() === foundItem.color.toLowerCase()) {
        score += 0.15;
    }
    totalCriteria += 0.15;

    // Brand match (15% weight)
    if (lostItem.brand && foundItem.brand && 
        lostItem.brand.toLowerCase() === foundItem.brand.toLowerCase()) {
        score += 0.15;
    }
    totalCriteria += 0.15;

    return score / totalCriteria;
};

// Simple string similarity (Levenshtein distance based)
const stringSimilarity = (str1, str2) => {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 1.0;
    
    return (longer.length - editDistance(longer, shorter)) / parseFloat(longer.length);
};

const editDistance = (str1, str2) => {
    str1 = str1.toLowerCase();
    str2 = str2.toLowerCase();

    const costs = [];
    for (let i = 0; i <= str1.length; i++) {
        let lastValue = i;
        for (let j = 0; j <= str2.length; j++) {
            if (i === 0) costs[j] = j;
            else {
                if (j > 0) {
                    let newValue = costs[j - 1];
                    if (str1.charAt(i - 1) !== str2.charAt(j - 1))
                        newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
                    costs[j - 1] = lastValue;
                    lastValue = newValue;
                }
            }
        }
        if (i > 0) costs[str2.length] = lastValue;
    }
    return costs[str2.length];
};

// Create notification (you'll need to create a Notification model)
const createNotification = async (userId, message, link, type) => {
    // For now, we'll just log it. You can create a Notification model later.
    console.log(`Notification for user ${userId}: ${message}`);
    
    // TODO: Create actual Notification model and save to database
    // const notification = await Notification.create({
    //     user: userId,
    //     message,
    //     link,
    //     type,
    //     isRead: false
    // });
};

module.exports = { findMatches, calculateSimilarity };