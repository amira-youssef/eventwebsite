// backend/controllers/eventController.js

const Event = require('../models/Event');

// Controller to create a new event
const createEvent = async (req, res) => {
  try {
    // Assuming you have the required fields in the request body
    const { title, description, date } = req.body;

    // Assuming you have the user ID from the authentication middleware
    const createdBy = req.session.userId;

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

module.exports = {
  createEvent,
  updateEvent,
  getAllEvents,
};
