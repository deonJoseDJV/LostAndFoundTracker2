const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// ✅ CRITICAL: Add this FIRST - Increase header limits
app.use(express.json({ 
    limit: '10mb',
    inflate: true 
}));
app.use(express.urlencoded({ 
    extended: true, 
    limit: '10mb',
    inflate: true,
    parameterLimit: 10000
}));

// ✅ SIMPLE CORS - No complex configuration
app.use(cors({
  origin: 'http://localhost:3000', // React default port
  credentials: true
}));

// ✅ Basic logging
app.use((req, res, next) => {
    console.log(`📨 ${req.method} ${req.url}`);
    next();
});

// ✅ Test endpoint
app.post('/api/test-headers', (req, res) => {
    console.log('✅ Test endpoint hit');
    res.json({ success: true, message: 'Test successful' });
});

// ✅ Register endpoint
// app.post('/api/auth/register', (req, res) => {
//     console.log('✅ Register endpoint hit');
//     res.json({ success: true, message: 'Registration successful' });
// });

app.get('/', (req, res) => {
    res.json({ message: 'Server running' });
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/items', require('./routes/itemRoutes'));

// MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.error('❌ MongoDB error:', err));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));