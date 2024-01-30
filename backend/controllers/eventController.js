// backend/controllers/eventController.js

const Event = require('../models/Event');

const createEvent = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const userId = req.user.id; // Assuming you have user authentication middleware

    const event = new Event({
      title,
      description,
      date,
      createdBy: userId,
    });

    const savedEvent = await event.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateEvent = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const { title, description, date } = req.body;

    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { title, description, date },
      { new: true }
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

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { createEvent, updateEvent, getAllEvents };
