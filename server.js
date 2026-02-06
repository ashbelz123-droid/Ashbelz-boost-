// --------------------------
// server.js
// --------------------------

const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');
const INDEX_FILE = path.join(PUBLIC_DIR, 'index.html');

// Auto-create public folder and default index.html if missing
if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR);
  console.log('✅ "public" folder created automatically.');
}

if (!fs.existsSync(INDEX_FILE)) {
  fs.writeFileSync(INDEX_FILE, `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Welcome to AshMediaBoost</title>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { font-family: Arial, sans-serif; text-align:center; padding:50px; }
        h1 { color:#4CAF50; }
      </style>
    </head>
    <body>
      <h1>Welcome to AshMediaBoost!</h1>
      <p>Your server is running successfully.</p>
    </body>
    </html>
  `);
  console.log('✅ Default index.html created.');
}

// Serve static files
app.use(express.static(PUBLIC_DIR));
console.log(`✅ Serving static files from "${PUBLIC_DIR}"`);

// SPA fallback route
app.get('*', (req, res) => {
  res.sendFile(INDEX_FILE);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
