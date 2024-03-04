import React, { useState } from 'react';
import styled from 'styled-components';
import ErrorMessage from './ErrorMessage';
import SuccessMessage from './SuccessMessage';

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

const EventList = ({ events, onRegister, onExpand, expandedCards }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleRegister = (eventId) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      setErrorMessage('You must be logged in to register for an event.');
      return;
    }
    // Construct the URL with the event ID and redirect
    window.location.href = `/test/${eventId}`;
  };

  return (
    <EventContainer>
      {events.map(event => (
        <EventCard key={event._id}>
          <h3>{event.title}</h3>
          {expandedCards.includes(event._id) ? (
            <div>
              <p>{event.description}</p>
              <p>Date: {event.date}</p>
              <button onClick={() => handleRegister(event._id)}>Register</button>
              <button onClick={() => onExpand(event._id)}>Close</button>
            </div>
          ) : (
            <button onClick={() => onExpand(event._id)}>Expand</button>
          )}
        </EventCard>
      ))}
      {errorMessage && <ErrorMessage message={errorMessage} onClose={() => setErrorMessage('registration failed ')} />}
      {successMessage && <SuccessMessage message={successMessage} onClose={() => setSuccessMessage('regusterddd !!!!!')} />}
    </EventContainer>
  );
};

export default EventList;
