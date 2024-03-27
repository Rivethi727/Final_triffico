import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NewTrip = () => {
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  // State variables for form fields
  const [destination, setDestination] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // State variables for form feedback
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Event handlers for form fields
  const handleDestinationChange = (e) => setDestination(e.target.value);
  const handleCheckInDateChange = (e) => setCheckInDate(e.target.value);
  const handleCheckOutDateChange = (e) => setCheckOutDate(e.target.value);
  const handleAdultsChange = (e) => setAdults(parseInt(e.target.value, 10));
  const handleChildrenChange = (e) => setChildren(parseInt(e.target.value, 10));
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value);

  // Event handler for form submission
  const handlePackageSelection = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_URL}/api/trips`, {
        destination,
        checkInDate,
        checkOutDate,
        adults,
        children,
        email,
        phoneNumber,
        userId
      });

      if (response.status === 201) {
        setSuccessMessage('Trip created successfully! Welcome to my Triffico!');
        setErrorMessage('');
        navigate('/package-details');
      } else {
        setErrorMessage('Error creating trip. Please try again.');
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error creating trip', error);
      setErrorMessage('Error creating trip. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="new-trip-form" style={{ margin: '25px auto', maxWidth: '600px' }}>
      <h2>New Trip Details</h2>
      <form onSubmit={handlePackageSelection} style={{ display: 'flex', flexDirection: 'column' }}>
        <label htmlFor="destination">Where are you going?</label>
        <input type="text" id="destination" value={destination} onChange={handleDestinationChange} required style={{ marginBottom: '10px' }} />

        <label htmlFor="checkInDate">Check In Date</label>
        <input type="date" id="checkInDate" value={checkInDate} onChange={handleCheckInDateChange} required style={{ marginBottom: '10px' }} />

        <label htmlFor="checkOutDate">Check Out Date</label>
        <input type="date" id="checkOutDate" value={checkOutDate} onChange={handleCheckOutDateChange} required style={{ marginBottom: '10px' }} />

        <label htmlFor="adults">Number of Adults</label>
        <input type="number" id="adults" value={adults} onChange={handleAdultsChange} min="1" required style={{ marginBottom: '10px' }} />

        <label htmlFor="children">Number of Children</label>
        <input type="number" id="children" value={children} onChange={handleChildrenChange} min="0" style={{ marginBottom: '10px' }} />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" value={email} onChange={handleEmailChange} required style={{ marginBottom: '10px' }} />

        <label htmlFor="phoneNumber">Phone Number</label>
        <input type="tel" id="phoneNumber" value={phoneNumber} onChange={handlePhoneNumberChange} required style={{ marginBottom: '10px' }} />

        <button type="submit" style={{ alignSelf: 'flex-start', backgroundColor: 'hsl(180, 98%, 31%)', color: 'white' }}>Select Package</button>

      </form>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default NewTrip;


