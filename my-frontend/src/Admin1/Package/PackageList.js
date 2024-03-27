


// PackageList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import Sidebar from "../Sidebar";

const PackageList = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_URL}/api/v1/getAll-packages`);
        setPackages(response.data);
      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    };

    fetchPackages();
  }, []);

  return (
    <div className="row">
      <div className="col-12 col-md-2">
        <Sidebar />
      </div>
      <div className="col-12 col-md-10">
        <div className="p-3">
          <div className="package-list">
            <h2 style={{ fontSize: '24px' }}>Package List</h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th style={{ fontSize: '1.4rem' }}>Package Name</th>
                  <th style={{ fontSize: '1.4rem' }}>Description</th>
                  <th style={{ fontSize: '1.4rem' }}>Cost</th>
                  <th style={{ fontSize: '1.4rem' }}>Hotels</th>
                  <th style={{ fontSize: '1.4rem' }}>Places</th>
                  <th style={{ fontSize: '1.4rem' }}>Mode of Travel</th>
                  <th style={{ fontSize: '1.4rem' }}>Inclusions</th>
                  <th style={{ fontSize: '1.4rem' }}>Exclusions</th>
                  <th style={{ fontSize: '1.4rem' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {packages.map((packageItem, index) => (
                  <tr key={index}>
                    <td style={{ fontSize: '1.4rem' }}>{packageItem.packageName}</td>
                    <td style={{ fontSize: '1.4rem' }}>{packageItem.description}</td>
                    <td style={{ fontSize: '1.4rem' }}>${packageItem.cost}</td>
                    <td>
                      {packageItem.hotel.map((hotel, hotelIndex) => (
                        <div key={hotelIndex} style={{ fontSize: '1.4rem' }}>
                          <strong>{hotel.hotelName}</strong> - ${hotel.hotelPrice}
                        </div>
                      ))}
                    </td>
                    <td>
                      {packageItem.places.map((place, placeIndex) => (
                        <div key={placeIndex} style={{ fontSize: '1.4rem' }}>
                          <strong>{place.placeName}</strong>
                        </div>
                      ))}
                    </td>
                    <td>
                      {packageItem.modeOfTravel.map((travel, travelIndex) => (
                        <div key={travelIndex} style={{ fontSize: '1.4rem' }}>
                          <strong>{travel.vehicleName}</strong> - {travel.hours} hours - ${travel.prize}
                        </div>
                      ))}
                    </td>
                    <td style={{ fontSize: '1.7rem' }}>{packageItem.inclusion.join(', ')}</td>
                    <td style={{ fontSize: '1.7rem' }}>{packageItem.exclusion.join(', ')}</td>
                    <td>
                      <Link to={`/admin/packages/edit/${packageItem._id}`} className="btn btn-primary" style={{ fontSize: '16px' }}>
                        Edit
                      </Link>
                      <Link to={`/admin/packages/delete/${packageItem._id}`} className="btn btn-danger ml-2" style={{ fontSize: '16px' }}>
                        Delete
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageList;



