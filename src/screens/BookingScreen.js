import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import SuccessMessage from '../components/SuccessMessage';
import Loading from '../components/Loading';
import moment from 'moment';

function Bookingscreen() {
  const { eventId } = useParams();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [event, setEvent] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        // Fetch event data using eventId
        const response = await axios.post('/api/events/getEventById/${eventId}');
        console.log(eventId);
        setEvent(response.data);
        setLoading(false);
      } catch (error) {
        // Handle errors if needed
        setLoading(false);
      }
    }
    fetchData();
  }, [eventId]);

  async function bookEvent() {
    const userId = JSON.parse(localStorage.getItem('currentUser'))._id;
    const booking = {
      eventId,
      eventName: event?.name || '',
      userId,
      eventDate: event?.date || '',
    };
    try {
      const result = await axios.post('/api/register/registerEvent', booking);
      console.log(result.data, ' : event booking successful');
      setSuccess(true);
    } catch (error) {
      // Handle errors if needed
      console.log(error);
    }
  }

  return (
    <div className='m-5'>
      {loading ? (
        <Loading />
      ) : event ? (
        <div>
          <div className='row justify-content-center mt-5 bs'>
            {success && <SuccessMessage message="Event booked successfully!" />}
            <div className='col-md-6'>
              <h1>{event.name}</h1>
              <img src={event.imageUrls[0]} className='bigimg' alt={event.name} />
            </div>
            <div className='col-md-5' style={{ textAlign: 'right' }}>
              <h1>Booking Details</h1>
              <div>
                <b>
                  <p>Name: {JSON.parse(localStorage.getItem('currentUser')).name} </p>
                  <p>Date: {moment(event.date).format('DD-MM-YYYY')}</p>
                </b>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ float: 'right' }} className='mt-1'>
                  <button className='btn btn-primary' onClick={bookEvent}>
                    Book Event
                  </button>
                </div>
                <hr />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ErrorMessage />
      )}
    </div>
  );
}

export default Bookingscreen;
