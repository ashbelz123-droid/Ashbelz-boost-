// --------------------------
// server.js
// --------------------------

const express = require('express');
const path = require('path');
const app = express();

// Use the PORT from Render or default to 3000
const PORT = process.env.PORT || 3000;

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Fallback route for Single Page Applications (React, Vue, etc.)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
