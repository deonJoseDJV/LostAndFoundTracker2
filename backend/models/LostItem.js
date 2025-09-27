const mongoose = require('mongoose');

const lostItemSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    itemName: { type: String, required: true },
    category: { 
        type: String, 
        required: true,
        enum: ['Electronics', 'Books', 'Accessories', 'ID Cards', 'Clothing', 'Water Bottles', 'Others']
    },
    description: String,
    locationLost: { type: String, required: true },
    dateLost: { type: Date, required: true },
    image: String, // Cloudinary URL
    color: String,
    brand: String,
    isFound: { type: Boolean, default: false },
    foundMatch: { type: mongoose.Schema.Types.ObjectId, ref: 'FoundItem' } // Link to found item
}, { timestamps: true });

module.exports = mongoose.model('LostItem', lostItemSchema);