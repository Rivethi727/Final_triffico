

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
// import '../../styles/list.css';
import Sidebar from "../Sidebar";

const TripList = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    // Fetch all trips when component mounts
    const fetchTrips = async () => {
      try {
        const response = await axios.get('http://localhost:4500/api/trips');
        setTrips(response.data);
      } catch (error) {
        console.error('Error fetching trips', error);
      }
    };

    fetchTrips();
  }, []);

  return (
    <div className="row">
      <div className="col-12 col-md-2">
        <Sidebar/>
      </div>
      <div className="col-12 col-md-10">
        <div className="p-3"></div>
        <div className="admin-dashboard">
          <h2>Admin Dashboard</h2>

          <table>
            <thead>
              <tr>
                <th style={{ fontSize: '1.9rem' }}>Destination</th>
                <th style={{ fontSize: '1.9rem' }}>Check-In Date</th>
                <th style={{ fontSize: '1.9rem' }}>Check-Out Date</th>
                <th style={{ fontSize: '1.9rem' }}>Adults</th>
                <th style={{ fontSize: '1.9rem' }}>Children</th>
                {/* <th style={{ fontSize: '1.9rem' }}>Duration</th> */}
                <th style={{ fontSize: '1.9rem' }}>Email</th>
                <th style={{ fontSize: '1.9rem' }}>Phone Number</th>
                <th style={{ fontSize: '1.9rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {trips.map((trip) => (
                <tr key={trip._id}>
                  <td style={{ fontSize: '1.9rem' }}>{trip.destination}</td>
                  <td style={{ fontSize: '1.9rem' }}>{trip.checkInDate}</td>
                  <td style={{ fontSize: '1.9rem' }}>{trip.checkOutDate}</td>
                  <td style={{ fontSize: '1.9rem' }}>{trip.adults}</td>
                  <td style={{ fontSize: '1.9rem' }}>{trip.children}</td>
                  {/* <td style={{ fontSize: '1.9rem' }}>{trip.duration}</td> */}
                  <td style={{ fontSize: '1.9rem' }}>{trip.email}</td>
                  <td style={{ fontSize: '1.9rem' }}>{trip.phoneNumber}</td>
                  <td>
                    <button onClick={() => handleEdit(trip._id)} style={{ fontSize: '1.2rem',color: 'blue' }}>Edit</button>
                    <button onClick={() => handleDelete(trip._id)}style={{ fontSize: '1.2rem',color: 'red' }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TripList;

