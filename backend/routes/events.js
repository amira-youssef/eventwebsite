// backend/routes/events.js

const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
};

// Routes
router.post('/create', isAuthenticated, eventController.createEvent);
router.put('/:eventId/update', isAuthenticated, eventController.updateEvent);
router.get('/', isAuthenticated, eventController.getAllEvents);

module.exports = router;
