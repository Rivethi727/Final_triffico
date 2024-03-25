import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PlacesList = () => {
  const [packages, setPackageData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchPackageDetails(id);
  }, [id]);

  const fetchPackageDetails = async (packageId) => {
    try {
      const response = await fetch(`http://localhost:4500/api/v1/getAll-packages/${packageId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch package details');
      }
      const data = await response.json();
      console.log(data.places)
      setPackageData(data.places); // Assuming places is an array in the response
    } catch (error) {
      console.error('Error fetching package details:', error);
    }
  };

  return (
    <section id="pack" className="packages">
      <div className="container">
      <h2 className="section-heading">Explore Places</h2>
        <div className="packages-content">
          <div className="row">
            {packages.map((place, index) => (
              <div key={index} className="col-md-4">
                <div className="single-package-item">
                 
                  {place.placeImage && place.placeImage.length > 0 && (
                    <img
                      src={place.placeImage}
                      alt={`package-${index + 1}`}
                      className="package-image"
                      style={{ maxWidth: '100%', height: '100%' }}
                    />
                  )}
                  <div className="single-package-item-txt">
                    <h3>{place.placeName}</h3>
                    <p className="package-price" style={{ fontSize: '2rem' }}> {place.placeDescription}</p>
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="about-btn text-center">
                  
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

export default PlacesList;
