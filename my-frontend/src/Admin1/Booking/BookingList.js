// AdminDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:4500/api/bookings');
      setBookings(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching bookings. Please try again later.');
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Booking List</h2>
      <table>
        <thead>
          <tr>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Selected Hotel</th>
            <th>Hotel Price</th>
            <th>Selected Vehicle</th>
            <th>Vehicle Price</th>
            <th>Total Amount</th>
            <th>User ID</th>
            <th>Package Name</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={index}>
              <td>{booking.startDate}</td>
              <td>{booking.endDate}</td>
              <td>{booking.selectedHotelName}</td>
              <td>{booking.selectedHotelPrice}</td>
              <td>{booking.selectedVehicleName}</td>
              <td>{booking.selectedVehiclePrice}</td>
              <td>{booking.totalAmount}</td>
              <td>{booking.userId}</td>
              <td>{booking.packageName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
