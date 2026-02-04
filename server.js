// server.js

// Load environment variables
require('dotenv').config();

// Required dependencies
const express = require('express');
const mongoose = require('mongoose');
const path = require('path'); // For static file serving
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files (CSS, images, JS)
app.use(express.static(path.join(__dirname, 'public'))); // Serve from 'public' folder

// MongoDB URI (from environment variables)
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Successfully connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit the process if DB connection fails
  });

// Route to check if the server is up
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
        <title>${process.env.SITE_NAME}</title>
        <link rel="stylesheet" href="/style.css">  <!-- Link to static CSS -->
      </head>
      <body>
        <h1>Welcome to ${process.env.SITE_NAME} 🚀</h1>
        <p>Your SMM Panel is ready! Start managing your social media activities now.</p>
        <a href="/smm-panel">Go to SMM Panel</a>  <!-- Link to SMM Panel -->
      </body>
    </html>
  `);
});

// Route to handle the SMM Panel
app.get('/smm-panel', (req, res) => {
  res.send(`
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
        <title>${process.env.SITE_NAME} - SMM Panel</title>
        <link rel="stylesheet" href="/style.css">  <!-- Link to static CSS -->
      </head>
      <body>
        <h1>Welcome to the SMM Panel 🚀</h1>
        <p>Manage your Social Media Marketing activities here.</p>
        <!-- Add more SMM Panel functionalities as needed -->
      </body>
    </html>
  `);
});

// Route to test the Pesapal connection (mock for now)
app.get('/pesapal', (req, res) => {
  const pesapalInfo = {
    consumerKey: process.env.PESAPAL_CONSUMER_KEY,
    consumerSecret: process.env.PESAPAL_CONSUMER_SECRET,
    environment: process.env.PESAPAL_ENV,
  };
  
  res.json(pesapalInfo);  // Return Pesapal info as a JSON response
});

// Route for Social Share API testing (mock for now)
app.get('/socialshare', (req, res) => {
  const socialShareInfo = {
    apiKey: process.env.SOCIALSPHARE_API_KEY,
    apiUrl: process.env.SOCIALSPHARE_API_URL,
  };
  
  res.json(socialShareInfo);  // Return Social Share info as a JSON response
});

// Start the server on the specified port
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`${process.env.SITE_NAME} is running on port ${PORT}`);
});
