const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// MongoDB Connection with IPv4 fix
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/floodrelief';
const PORT = process.env.PORT || 5000;

console.log('NODE_ENV:', process.env.NODE_ENV || 'not set');
console.log('PORT:', PORT);
console.log('MONGODB_URI:', MONGODB_URI.startsWith('mongodb') ? 'OK' : 'INVALID URI');

mongoose.connect(MONGODB_URI, {
  family: 4  // Force IPv4
})
.then(() => {
  console.log('✅ MongoDB connected successfully');
  console.log('Database:', mongoose.connection.name);
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
  console.error('Please check your connection string and DNS settings');
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/requests', require('./routes/requests'));

// Serve HTML files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});