const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/eventmanagement', { useNewUrlParser: true, useUnifiedTopology: true });

// Check if the connection was successful
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Your other Express server setup goes here

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
