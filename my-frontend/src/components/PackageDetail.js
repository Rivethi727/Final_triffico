
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const PackageList = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get('http://localhost:4500/api/v1/getAll-packages');
        setPackages(response.data);
      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    };

    fetchPackages();
  }, []);

  return (
    <section id="pack" className="packages">
      <div className="container">
      <h2 className="section-heading">Our Amazing Service Packages</h2>
        <div className="packages-content">
          <div className="row">
            {packages.map((packageItem, index) => (
              <div key={index} className="col-md-4">
                <div className="single-package-item">
                  {/* Display images if available */}
                  {packageItem.packageImage && packageItem.packageImage.length > 0 && (
                    <img src={packageItem.packageImage} alt={`package-${index + 1}`} className="package-image" style={{ maxWidth: '100%', height: '100%' }}/>
                  )}
                  <div className="single-package-item-txt">
                    <h3>{packageItem.packageName}</h3>
                    <p className="package-price"style={{ fontSize: '2rem' }}></p>
                    {/* <p style={{ fontSize: '1.9rem' }}>Nights: {packageItem.nights}</p> */}
                    {/* <div className="accommodation-details">
                      <p style={{ fontSize: '1.9rem' }}>
                        <strong></strong> {packageItem.accommodation.name}
                      </p>
                      <p style={{ fontSize: '1.9rem' }}>
                        <strong>Type:</strong> {packageItem.accommodation.type}
                      </p>
                      <p style={{ fontSize: '1.9rem' }}>
                        <strong>Facilities:</strong> {packageItem.accommodation.facilities.join(', ')}
                      </p>
                      <p style={{ fontSize: '1.9rem' }}>
                        <strong>Cost per night:</strong> ${packageItem.accommodation.costPerNight}
                      </p>
                    </div> */}
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="about-btn text-center">
                    <Link to={`/packages/${packageItem._id}`} className="btn btn-info"style={{ fontSize: '1.9rem',textDecoration:'none',backgroundColor: 'hsl(180, 98%, 31%)', color:'white' }}>
                      Explore Tour
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PackageList;




