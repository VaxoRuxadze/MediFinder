const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');
const clinicRoutes = require('./routes/clinics');
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/bookings');
const chatbotRoutes = require('./routes/chatbot');
const { startReminderCron } = require('./services/ReminderService');
const reportRoutes = require('./routes/reportRoutes');
const pharmacyRoutes = require('./routes/pharmacyRoutes');

// Load env vars
dotenv.config({ path: path.join(__dirname, '.env') });

// Check if essential env vars are loaded
console.log('🔧 Environment Check:');
console.log(`MONGODB_URI: ${process.env.MONGODB_URI ? '✅ Set' : '❌ Missing'}`);
console.log(`JWT_SECRET: ${process.env.JWT_SECRET ? '✅ Set' : '❌ Missing'}`);
console.log(`GEMINI_API_KEY: ${process.env.GEMINI_API_KEY ? '✅ Set' : '❌ Missing'}`);

// Connect to database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;
startReminderCron();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from public folder
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Routes - make sure each route file exports a valid router
app.use('/api/clinics', clinicRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/pharmacy', pharmacyRoutes);
// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!', 
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

require('./services/ReminderService')