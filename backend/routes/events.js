const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// Controller to create a new event
const createEvent = async (req, res) => {
  try {
    const { title, description, date, createdBy } = req.body;

    // Check if createdBy is provided, if not, handle it accordingly
    if (!createdBy) {
      return res.status(400).json({ message: 'User information is required to create an event' });
    }

    const event = new Event({
      title,
      description,
      date,
      createdBy,
    });

    const savedEvent = await event.save();

    res.status(201).json(savedEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller to update an existing event
const updateEvent = async (req, res) => {
  try {
    const eventId = req.params.eventId;

    // Assuming you have the fields you want to update in the request body
    const { title, description, date } = req.body;

    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { title, description, date },
      { new: true, runValidators: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(updatedEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller to retrieve all events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Routes
router.post('/create', createEvent);
router.put('/:eventId/update', updateEvent);
router.get('/', getAllEvents);

module.exports = router;
