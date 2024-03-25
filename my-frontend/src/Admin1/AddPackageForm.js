
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Sidebar from './Sidebar';


const EditPackage = () => {
  const [packageDetails, setPackageDetails] = useState({});
  const [formData, setFormData] = useState({
    packageName: '',
    description: '',
    cost: '',
    hotel: [],
    places: [],
    modeOfTravel: [],
    inclusion: [],
    exclusion: [],
  });

  const { id } = useParams();

  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4500/api/v1/get-package/${id}`);
        setPackageDetails(response.data);
        setFormData({
          packageName: response.data.packageName,
          description: response.data.description,
          cost: response.data.cost,
          hotel: response.data.hotel,
          places: response.data.places,
          modeOfTravel: response.data.modeOfTravel,
          inclusion: response.data.inclusion,
          exclusion: response.data.exclusion,
        });
      } catch (error) {
        console.error('Error fetching package details:', error);
      }
    };

    fetchPackageDetails();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:4500/api/v1/update-package/${id}`, formData);
      alert('Package updated successfully');
      window.location.href = '/admin/packages';
    } catch (error) {
      console.error('Error updating package:', error);
    }
  };

  const handleHotelChange = (e) => {
    const selectedHotels = Array.from(e.target.selectedOptions).map(option => option.value);
    setFormData({ ...formData, hotel: selectedHotels });
  };
  const handlePlacesChange = (e) => {
    const selectedPlaces = Array.from(e.target.selectedOptions).map(option => option.value);
    setFormData({ ...formData, places: selectedPlaces });
  };

  const handleModeOfTravelChange = (e) => {
    const selectedModesOfTravel = Array.from(e.target.selectedOptions).map(option => option.value);
    setFormData({ ...formData, modeOfTravel: selectedModesOfTravel });
  };
  const handleInclusionChange = (e) => {
    const selectedInclusions = Array.from(e.target.selectedOptions).map(option => option.value);
    setFormData({ ...formData, inclusion: selectedInclusions });
  };
  const handleExclusionChange = (e) => {
    const selectedExclusions = Array.from(e.target.selectedOptions).map(option => option.value);
    setFormData({ ...formData, exclusion: selectedExclusions });
  };

  return (

    <div className="row">
    <div className="col-12 col-md-2">
       <Sidebar/>
       </div>
       <div className="col-12 col-md-10">
      <div className="p-3">
       
    <div className="p-3">
      <h2>Edit Package</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="packageName">
          <Form.Label>Package Name</Form.Label>
          <Form.Control
            type="text"
            name="packageName"
            value={formData.packageName}
            onChange={handleChange}
            placeholder="Enter package name"
          />
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
          />
        </Form.Group>

        <Form.Group controlId="cost">
          <Form.Label>Cost</Form.Label>
          <Form.Control
            type="number"
            name="cost"
            value={formData.cost}
            onChange={handleChange}
            placeholder="Enter cost"
          />
        </Form.Group>

        

        <Form.Group controlId="hotel">
  <Form.Label>Hotel</Form.Label>
  <Form.Control as="select" multiple value={formData.hotel} onChange={handleHotelChange}>
    {packageDetails.hotels && packageDetails.hotels.map(hotel => (
      <option key={hotel._id} value={hotel._id}>
        {hotel.hotelName}
      </option>
    ))}
  </Form.Control>
</Form.Group>
<Form.Group controlId="places">
  <Form.Label>Places</Form.Label>
  <Form.Control as="select" multiple value={formData.places} onChange={handlePlacesChange}>
    {packageDetails.places && packageDetails.places.map(place => (
      <option key={place._id} value={place._id}>
        {place.placeName}
      </option>
    ))}
  </Form.Control>
</Form.Group>

<Form.Group controlId="modeOfTravel">
  <Form.Label>Mode of Travel</Form.Label>
  <Form.Control as="select" multiple value={formData.modeOfTravel} onChange={handleModeOfTravelChange}>
    {packageDetails.modesOfTravel && packageDetails.modesOfTravel.map(mode => (
      <option key={mode._id} value={mode._id}>
        {mode.vehicleName}
      </option>
    ))}
  </Form.Control>
</Form.Group>

<Form.Group controlId="inclusion">
  <Form.Label>Inclusion</Form.Label>
  <Form.Control as="select" multiple value={formData.inclusion} onChange={handleInclusionChange}>
    {packageDetails.inclusions && packageDetails.inclusions.map(inclusion => (
      <option key={inclusion._id} value={inclusion._id}>
        {inclusion.inclusionName}
      </option>
    ))}
  </Form.Control>
</Form.Group>

<Form.Group controlId="exclusion">
  <Form.Label>Exclusion</Form.Label>
  <Form.Control as="select" multiple value={formData.exclusion} onChange={handleExclusionChange}>
    {packageDetails.exclusions && packageDetails.exclusions.map(exclusion => (
      <option key={exclusion._id} value={exclusion._id}>
        {exclusion.exclusionName}
      </option>
    ))}
  </Form.Control>
</Form.Group>

        <Button variant="primary" type="submit">
          Save Changes
        </Button>
      </Form>
    </div>
    </div>
    </div>
    </div>
  );
};

export default EditPackage;

       