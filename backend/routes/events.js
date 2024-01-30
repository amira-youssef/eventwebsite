// backend/routes/events.js

const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Create a new event
router.post('/create', eventController.createEvent);

// Update an existing event
router.put('/:eventId/update', eventController.updateEvent);

// Retrieve all events
router.get('/', eventController.getAllEvents);

module.exports = router;
