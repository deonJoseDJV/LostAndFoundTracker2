const express = require('express');
const { 
    reportLost, 
    reportFound, 
    getLostItems, 
    getFoundItems,
    claimFoundItem,
    getMatchesForLostItem,
    getUserLostItems
} = require('../controllers/itemController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.post('/lost', protect, upload.single('image'), reportLost);
router.post('/found', protect, upload.single('image'), reportFound);
router.get('/lost', getLostItems);
router.get('/found', getFoundItems);
router.post('/claim/:foundItemId', protect, claimFoundItem); // Add this
router.get('/matches/:lostItemId', protect, getMatchesForLostItem); // Add this
router.get('/my-lost-items', protect, getUserLostItems); // Add this

module.exports = router;