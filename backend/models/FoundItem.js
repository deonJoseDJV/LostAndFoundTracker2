const mongoose = require('mongoose');

const foundItemSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    itemName: { type: String, required: true },
    category: { 
        type: String, 
        required: true,
        enum: ['Electronics', 'Books', 'Accessories', 'ID Cards', 'Clothing', 'Water Bottles', 'Others']
    },
    description: String,
    locationFound: { type: String, required: true },
    dateFound: { type: Date, required: true },
    image: String, // Cloudinary URL
    color: String,
    brand: String,
    isClaimed: { type: Boolean, default: false },
    claimedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Who claimed it
}, { timestamps: true });

module.exports = mongoose.model('FoundItem', foundItemSchema);