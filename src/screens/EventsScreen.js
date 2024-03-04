import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const EventContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const EventCard = styled.div`
  background-color: #f9f9f9;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); 
  width: calc(33.33% - 20px); /* Adjust width as needed */
`;

const EventsScreen = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events from backend API
    axios.get('http://localhost:5000/api/events/')
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, []);





  const handleRegister = async (eventId) => {
    try {
      // Retrieve userId from localStorage
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      const userId = currentUser ? currentUser.userId : null;
  
      // Check if user is logged in
      if (!userId) {
        alert('You must be logged in to register for an event.');
       return;
      }
  
      // Send POST request to register for the event
      await axios.post('http://localhost:5000/api/register/registerEvent', {
        eventId: eventId,
        userId: userId
      });
  
      // Registration successful
      alert('Registered successfully!');
      // You can trigger a page reload or update the state to reflect the registration
    } catch (error) {
      // Handle errors
      console.error('Error registering for event:', error);
    }
  };
  
  return (
    <div> 
      <h2>Event Dashboard</h2>
      <hr />
      <EventContainer>
        {events.map(event => (
          <EventCard key={event._id}>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p>Date: {event.date}</p>
            <button onClick={() => handleRegister(event._id)}>Register</button> 
          
          </EventCard>
        ))}
      </EventContainer>
    </div>
  );
};

export default EventsScreen;
