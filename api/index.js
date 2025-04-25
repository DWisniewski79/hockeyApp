// api/index.js
const express = require('express');
const { connectDB } = require('./db/connection'); // Fixed import path

const app = express();
const PORT = process.env.API_PORT || 5000;

// Database connection
connectDB();

// Example route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});