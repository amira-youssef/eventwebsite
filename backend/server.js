const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const eventRoutes = require('./routes/events'); // Import event routes


const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/eventmanagement', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes); 
// Your other routes and middleware go here

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
