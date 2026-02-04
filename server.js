// server.js
// AshMediaBoost – Fully Integrated Server Script

require('dotenv').config(); // Load environment variables from .env

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

/* =========================
   BASIC MIDDLEWARE
========================= */
app.use(express.json());   // To parse JSON data
app.use(express.urlencoded({ extended: true }));  // To parse form-data and URL encoded data

/* =========================
   SERVING STATIC FILES (CSS / JS)
========================= */
// Make sure your CSS and JS are inside the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

/* =========================
   DATABASE CONNECTION (MongoDB)
========================= */
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.warn('⚠️ MONGO_URI not provided. Running without database.');
} else {
  mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('✅ MongoDB connected successfully'))
    .catch(err => {
      console.error('❌ MongoDB connection error:', err.message);
      // Do not exit process on production to keep the app running
    });
}

/* =========================
   ROUTES
========================= */

// Home route – main landing page
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>AshMediaBoost</title>
        <link rel="stylesheet" href="/css/style.css"> <!-- Link to static CSS -->
      </head>
      <body>
        <h1>Welcome to AshMediaBoost 🚀</h1>
        <p>Your server is up and running!</p>
      </body>
    </html>
  `);
});

// Health check route – useful for testing server health in production
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date()
  });
});

// Test route for Pesapal integration
app.get('/pesapal', (req, res) => {
  res.json({
    consumerKey: process.env.PESAPAL_CONSUMER_KEY || 'Not Set',
    consumerSecret: process.env.PESAPAL_CONSUMER_SECRET || 'Not Set',
    environment: process.env.PESAPAL_ENV || 'Not Set'
  });
});

// Test route for Social Share API
app.get('/socialshare', (req, res) => {
  res.json({
    apiKey: process.env.SOCIALSPHARE_API_KEY || 'Not Set',
    apiUrl: process.env.SOCIALSPHARE_API_URL || 'Not Set'
  });
});

/* =========================
   404 ERROR HANDLER (if route is not found)
========================= */
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found'
  });
});

/* =========================
   SERVER START (on specific port)
========================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ AshMediaBoost server running on port ${PORT}`);
});
