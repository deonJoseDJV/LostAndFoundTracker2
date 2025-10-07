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

// ✅ CORS configuration for both development and production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-app-name.railway.app', 'http://localhost:3000']
    : 'http://localhost:3000',
  credentials: true
};
app.use(cors(corsOptions));

// ✅ Basic logging
app.use((req, res, next) => {
    console.log(`📨 ${req.method} ${req.url}`);
    next();
});

// ✅ Serve static files from React build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  console.log('✅ Serving React build files');
}

// ✅ Test endpoint
app.post('/api/test-headers', (req, res) => {
    console.log('✅ Test endpoint hit');
    res.json({ success: true, message: 'Test successful' });
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/items', require('./routes/itemRoutes'));

// ✅ Catch all handler for production - send React app
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
  });
} else {
  // Development root route
  app.get('/', (req, res) => {
    res.json({ message: 'Server running in development mode' });
  });
}

// MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.error('❌ MongoDB error:', err));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));