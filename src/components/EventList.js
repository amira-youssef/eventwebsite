import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events based on user ID
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/api/events',
          {
            withCredentials: true,
          }
        );
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error.response?.data?.message);
        // Handle error (display message, etc.)
      }
    };

    fetchEvents();
  }, []); // Ensure it runs only once on component mount

  return (
    <div>
      <ul>
        {events.map((event) => (
          <li key={event._id}>
            {event.title} - {event.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
