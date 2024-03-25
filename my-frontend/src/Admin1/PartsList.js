// PartsList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PartsList() {
  const [parts, setParts] = useState([]);

  useEffect(() => {
    fetchParts();
  }, []);

  const fetchParts = async () => {
    try {
      const response = await axios.get('http://localhost:7000/api/v1/parts');
      setParts(response.data.parts);
    } catch (error) {
      console.error('Error fetching parts:', error);
    }
  };

  const deletePart = async (partId) => {
    try {
      await axios.delete(`http://localhost:7000/api/v1/part/${partId}`);
      fetchParts();
    } catch (error) {
      console.error('Error deleting part:', error);
    }
  };

  return (
    <div className="parts-list">
      <h2 className='details'>Parts List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Image</th>
            <th>Category</th>
            <th>Seller Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>IC No</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {parts.map(part => (
            <tr key={part._id}>
              <td>{part.name}</td>
              <td>{part.price}</td>
              <td>{part.description}</td>
              <td>{part.image && part.image.url ? <img src={part.image.url} alt="Part" /> : 'No Image'}</td>
              <td>{part.category}</td>
              <td>{part.sellerName}</td>
              <td>{part.email}</td>
              <td>{part.phoneNumber}</td>
              <td>{part.address}</td>
              <td>{part.icNo}</td>
              <td>
                <button onClick={() => deletePart(part._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PartsList;
