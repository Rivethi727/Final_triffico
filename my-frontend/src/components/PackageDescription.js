

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import 'react-toastify/dist/ReactToastify.css';

import PaymentSuccess from './PaymentSuccess'

const PackageDescription = () => {
  const [packageData, setPackageData] = useState(null);
  const navigate = useNavigate();

  // console.log(packageData?.packageName)
  // const packageName = packageData.packageName
  const { id } = useParams();

  const [cashOnDelivery, setCashOnDelivery] = useState(false);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [hasOrders, setHasOrders] = useState(false);
  const userId = localStorage.getItem("userId");
  const [bookingData, setBookingData] = useState(null);

  // const [startDate, setStartDate] = useState(new Date());
  const [startDate, setSponser] = useState({
    startDate: {
      year: null,
      month: null,
      day: null
    }
  });
  const [endDate, setEndDate] = useState({
    endDate: {
      yearEnd: null,
      monthEnd: null,
      dayEnd: null
    }
  });
  

  useEffect(() => {
    fetchPackageDetails(id);
  }, [id]);

  const fetchPackageDetails = async (packageId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_URL}/api/v1/getAll-packages/${packageId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch package details');
      }
      const data = await response.json();
      setPackageData(data);
    } catch (error) {
      console.error('Error fetching package details:', error);
    }
  };



  const [totalCost, setTotalCost] = useState(0);
  const [modeOfTravelPrize, setModeOfTravelPrize] = useState(undefined);
  const [extraServices, setExtraServices] = useState({
    homePickup: 0,
    nightFood: 0,
    driver: 0,
  });

  const handleExtraServicesChange = (service, cost) => {
    setExtraServices((prevServices) => ({
      ...prevServices,
      [service]: prevServices[service] ? 0 : cost, // Toggle the cost
    }));
  };

  const totalExtraServicesCost = Object.values(extraServices).reduce((acc, cost) => acc + cost, 0);
 
  const makePayment = (token) => {
    console.log("its working good")
    const body = {
        token,
        bookingData
    }
    console.log(body)
    const headers = {
        "Content-Type": "application/json"
    }
    return fetch('http://localhost:4500/api/v1/payment',{
        method: 'POST',
        headers,
        body: JSON.stringify(body)
    }).then((response)=> {
      navigate('/payment'); 
        // placeOrderHandler()
        console.log(response);
    }).catch((error)=> {
        console.log(error);
    })
}
var allTotalAmount = totalCost + modeOfTravelPrize + totalExtraServicesCost

// order post model start
const [formData, setFormData] = useState({
    userName: '',
    phoneNo: '',
    address: '',
  });

  const openFormHandler = () => {
    setIsFormOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const checkUserId = async () => {
    try {
      const response = await fetch(`http://localhost:4500/api/v1/check-user-orders/${userId}`);
      console.log(response)
      if (response.ok) {
        const data = await response.json();
        setHasOrders(data.hasOrders);
      } else {
        console.error('Failed to check user orders');
      }
    } catch (error) {
      console.error('Error checking user orders:', error);
    }
  };

  useEffect(() => {
    getPackageById();
    checkUserId();
  }, [userId]);

  const submitFormHandler = async () => {
    try {
        const formDataWithUserId = {
            ...formData,
            userId: userId,
          };
        const response = await fetch('http://localhost:4500/api/v1/create-order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formDataWithUserId),
        });
  
        if (!response.ok) {
          throw new Error('Failed to submit form data');
        }
        console.log('Form data submitted successfully');
      } catch (error) {
        console.error('Error submitting form data:', error);
      }

    // Close the form after submitting
    checkUserId();
    setIsFormOpen(false);
  };
// order post model end

const handleFormSubmit = async (event) => {
  event.preventDefault();

  // Extract form data
  const formData = new FormData(event.target);
  const formObject = {};
  formData.forEach((value, key) => {
    formObject[key] = value;
  });
  const startDate = new Date(formObject.startDate);
  const endDate = new Date(formObject.endDate);

  // Find the selected hotel
  const selectedOption = event.target.accommodation;
  const selectedHotelName = selectedOption.options[selectedOption.selectedIndex].value;
  const selectedHotelPrice = parseFloat(selectedOption.options[selectedOption.selectedIndex].getAttribute('data-price'));

  // Find the selected hotel directly in the array
  const selectedHotel = packageData.hotel.find((hotel) => {
    return hotel.hotelName === selectedHotelName && hotel.hotelPrice === selectedHotelPrice;
  });

  if (!selectedHotel) {
    console.error('Selected hotel not found');
    return;
  }

  // Calculate total cost
  const differenceInDays = Math.ceil((endDate - startDate) / (1000  *60  *60 * 24));
  const totalCost = differenceInDays * selectedHotel.hotelPrice;
  setTotalCost(totalCost);

  const selectedOptionOne = event.target.modeOfTravel;
  const selectedVehicleName = selectedOptionOne.options[selectedOptionOne.selectedIndex].value;
  const selectedVehiclePrice = parseFloat(selectedOptionOne.options[selectedOptionOne.selectedIndex].getAttribute('data-vehicle-price'));
  setModeOfTravelPrize(selectedVehiclePrice);
  


  

  
  // You can now use 'totalCost' in your logic or send it to your server
  console.log('Selected Hotel Name:', selectedHotelName);
  console.log('Selected Hotel Price:', selectedHotelPrice);
  console.log('Selected Vehicle Price:', selectedVehiclePrice);
  console.log('Total Cost:', totalCost);
  const totalAmount = totalCost+selectedVehiclePrice

  // You can now send 'formObject' and 'selectedHotel' to your server using fetch or any other method
  
  try {
    const response = await fetch('http://localhost:4500/api/v1/create-booking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...formObject, selectedHotelName, selectedHotelPrice, userId,totalAmount, selectedVehiclePrice, selectedVehicleName }),
    });

    if (!response.ok) {
      throw new Error('Failed to submit form data');
    }
    getPackageById();
    // Handle success, e.g., show a success message or redirect
    console.log('Form data submitted successfully');
  } catch (error) {
    console.error('Error submitting form data:', error);
    // Handle error, e.g., show an error message
  }
};

const getPackageById = async () => {
  try {
    const response = await fetch(`http://localhost:4500/api/v1/getUserById/${userId}`);
    if (response.ok) {
      const data = await response.json();
      console.log(data.checkOutDate)
      const localDate = new Date(data.checkInDate).toLocaleDateString('en-GB');
      const localDateEnd = new Date(data.checkOutDate).toLocaleDateString('en-GB');
      const [day, month, year] = localDate.split('/').map(Number);
      const [dayEnd, monthEnd, yearEnd] = localDateEnd.split('/').map(Number);
      setSponser(prevSponser => ({
        ...prevSponser,
        startDate: {
          year,
          month,
          day
        }
      })); 
      setEndDate(prevSponsers => ({
        ...prevSponsers,
        endDate: {
          yearEnd,
          monthEnd,
          dayEnd
        }
      })); 
    } else {
      console.error('Failed to get package by id');
    }
  } catch (error) {
    console.error('Error getting package by id:', error);
  }
};


console.log(bookingData)
  return (
   
    <div className="container my-5 py-5 plant-details-container">
      {packageData ? (
        <div className="row align-items-center">
          <div className='row' style={{boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', height:"45vh"}}>
          <div className="col-md-6">
            <img src={packageData.packageImage} alt={packageData.packageName} className="img-fluid mt-5" style={{ width: '350px',margin:'0 auto' }} />
          </div>
          <div className="col-md-6">
            <div className="plant-details-box mt-5" style={{ fontSize: '1.9rem', width: '580px',margin: '0 auto'}} >
              <h2>{packageData.packageName}</h2>
              <p>Description: {packageData.description}</p>
              {/* <p>Duration: {packageData.duration} days</p> */}
              <p>Departure City: Northen Provice</p>
              <p>Cost: ${packageData.cost}</p>
              <p>Inclusions: {packageData.inclusion.join(', ')}</p>
              <p>Exclusions: {packageData.exclusion.join(', ')}</p>
            </div>
          </div>
          </div>

          <section className="bg-light border-top py-4 mt-5">
            <div className="container">
              <div className="row gx-4">
                <div className="col-lg-8 mb-4">
                  <div className="border rounded-2 px-3 py-2 bg-white">

                    {/* <!-- Start Card --> */}
                    <div className="card"style={{ background: 'white' }} >
                      <div className="card-body">
                        {/* <!-- Start Form --> */}
                        <form id="bookingForm" action="#" method="" className="needs-validation" onSubmit={handleFormSubmit} noValidate autoComplete="off">


                          <div className="form-row">
                            <div className="form-group col-md-6">
                              <label htmlFor="inputDate" style={{ fontSize: '1.8rem' }}>Start Date</label>
                              <input type="date" className="form-control " style={{ fontSize: '1.8rem' }} id="inputDate" name="startDate"  value={`${startDate?.startDate?.year}-${startDate?.startDate?.month?.toString().padStart(2, '0')}-${startDate?.startDate?.day?.toString().padStart(2, '0')}`} required />
                            </div>
                            <div className="form-group col-md-6">
                              <label htmlFor="inputDate" style={{ fontSize: '1.8rem' }}>End Date</label>
                              <input type="date" className="form-control" style={{ fontSize: '1.8rem' }} id="inputDate" name="endDate"  value={`${endDate?.endDate?.yearEnd}-${endDate?.endDate?.monthEnd?.toString().padStart(2, '0')}-${endDate?.endDate?.dayEnd?.toString().padStart(2, '0')}`}required />
                            </div>
                          </div>

                          <hr />


                          <div className="form-group">
                            <legend className="col-form-label pt-0" style={{ fontSize: '1.8rem' }}>Accommodation</legend>
                            <select className="form-control" name="accommodation" required>
                         {packageData.hotel.map((hotel, index) => (
                         <option key={index} value={hotel.hotelName} data-price={hotel.hotelPrice}>
                         {hotel.hotelName} - ${hotel.hotelPrice}
                         </option>
                          ))}
                        </select>
                          </div>
                          {/* <!-- End Check Room Type --> */}
                          <hr />

                          {/* <!-- Start Check Room Type --> */}
                          <div className="form-group">
                            <legend className="col-form-label pt-0" style={{ fontSize: '1.8rem' }} >mode of travel (12 hours)</legend>
                            <select className="form-control" name="modeOfTravel" style={{ fontSize: '1.8rem' }} required>
                              {packageData.modeOfTravel.map((modeOfTravel, index) => (
                                <option key={index} value={modeOfTravel.vehicleName} data-vehicle-price={modeOfTravel.prize} style={{ fontSize: '1.8rem' }}>
                                  {modeOfTravel.vehicleName} - Rs.{modeOfTravel.prize}
                                </option>
                              ))}
                            </select>
                          </div>
                          <hr />

                          {/* <!-- End Check Room Type --> */}
                          <div className="form-group2">
                             <legend className="col-form-label pt-0">Place to Visit</legend>
        
                               <Link to={`/places/${packageData._id}`} className="btn btn-info" style={{
                             '--bs-btn-padding-y': '.75rem',
                              '--bs-btn-padding-x': '.75rem',
                              '--bs-btn-font-size': '1.3rem',
                              backgroundColor: 'hsl(180, 98%, 31%)', color:'white'}}>
                          Place to visit 
                        </Link>
             </div>


                          {/* <div className="form-group2 mt-3">
                            <legend className="col-form-label pt-0">View Hotel</legend>
                            <button
                              className="btn btn-info"
                              onClick={() => {
                                // Handle the click event, e.g., navigate to the hotel page
                                console.log('View Hotel clicked');
                              }}
                              style={{
                                '--bs-btn-padding-y': '.75rem',
                                '--bs-btn-padding-x': '.75rem',
                                '--bs-btn-font-size': '1.3rem',
                                backgroundColor: 'hsl(180, 98%, 31%)',color:'white'}}>
                              View Hotel
                            </button>
                          </div> */}
                          {/* <!-- End Check Room Type --> */}
                          <hr />



                          {/* <!-- Start Input Remark --> */}
                          <div className="form-group">
                            <label for="textAreaRemark" style={{ fontSize: '1.8rem' }}>Notes</label>
                            <textarea className="form-control" name="notes" id="textAreaRemark" rows="2" placeholder="Tell us you want more..." style={{ fontSize: '1.8rem' }}></textarea>
                          </div>
                          {/* <!-- End Input Remark --> */}

                          {/* <!-- Start Submit Button --> */}
                          <button className="btn btn-info" type="submit" style={{ fontSize: '1.8rem',backgroundColor: 'hsl(180, 98%, 31%)', color:'white' }}>Submit</button>
                          {/* <!-- End Submit Button --> */}
                        </form>

                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="px-0 border rounded-2 shadow-0">
                    <div className="card"style={{ background: 'white' }}>
                      <div className="card-body" >
                        <h5 className="card-title" style={{ fontSize: '1.9rem' }}>
                          Total Charges
                        </h5>
                        <table className="table">
                          <tr>
                            <td style={{ fontSize: '1.8rem' }}>Hotel</td>
                            <td className="price">{totalCost}</td>
                          </tr>
                          <tr>
                            <td style={{ fontSize: '1.8rem' }}>Mode of Travel</td>
                            <td className="price">{modeOfTravelPrize}</td>
                          </tr>

                          {/* Extra Services */}
                          <tr>
                            <td colSpan="2">
                              <legend className="col-form-label pt-0" style={{ fontSize: '1.8rem' }}>Extra Services</legend>
                              <div className="form-check">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="homePickup"
                                  onChange={() => handleExtraServicesChange('homePickup', 20)}
                                />
                                <label className="form-check-label" htmlFor="homePickup" style={{ fontSize: '1.8rem' }}>
                                  Home Pickup (Rs20)
                                </label>
                              </div>
                              <div className="form-check">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="nightFood"
                                  onChange={() => handleExtraServicesChange('nightFood', 15)}
                                />
                                <label className="form-check-label" htmlFor="nightFood" style={{ fontSize: '1.8rem' }}>
                                  Night Food (Rs15)
                                </label>
                              </div>
                              <div className="form-check">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="driver"
                                  onChange={() => handleExtraServicesChange('driver', 30)}
                                />
                                <label className="form-check-label" htmlFor="driver" style={{ fontSize: '1.8rem' }}>
                                  Driver (Rs30)
                                </label>
                              </div>
                            </td>
                          </tr>
                          {/* End Extra Services */}

                          <tr className="total">
                            <td style={{ fontSize: '1.8rem' }}>Total</td>
                            <td className="price">Rs{Number(allTotalAmount)}</td>
                          </tr>
                        </table>
                        {/* < button className="btn">
              <i className="fa-solid fa-lock"></i> Book Securely
            </button> */}

                        {/* <BookingForm
                          totalCost={totalCost}
                          modeOfTravelPrize={modeOfTravelPrize}
                          totalExtraServicesCost={totalExtraServicesCost}
                        /> */}
                        {/* Use Link for navigation */}
                        {/* / */}

                        {/* <StripeCheckout
                          stripeKey="pk_test_51OpYPPSHE9n8AgcuRSTm0lrq7x8w0PRl3CmgVIyMMQV7vS7gbV9DdX8M28a4MM8iI3HOP5ZfBzUjVcD0qRksG4K30089ImalUx"
                          token={(token) => makePayment(token)}
                          name={cartItems.length > 0 ? cartItems[0].product.name : 'Default Name'}
                          amount={cartItems.length > 0 ? cartItems[0].product.price * 100 : 0}
                        >
                          <button id="checkout_btn" className="btn btn-primary btn-block">
                            Place All Order
                          </button>
                        </StripeCheckout> */}
                        <input
                              type="radio"
                              id="cashOnDeliveryTrue"
                              name="cashOnDelivery"
                              value={true}
                              checked={cashOnDelivery}
                              onChange={() => setCashOnDelivery(true)}
                             />
                             <label htmlFor="cashOnDeliveryTrue">Cash on Delivery</label>
                             <input
                              type="radio"
                              id="cashOnDeliveryFalse"
                              name="cashOnDelivery"
                              value={false}
                              checked={!cashOnDelivery}
                              onChange={() => setCashOnDelivery(false)}
                             />
                             <label htmlFor="cashOnDeliveryFalse">Place Order</label>
                        {hasOrders ? (
                            <button
                              id="checkout_btn"
                              // onClick={placeOrderHandler}
                              className="btn btn-info btn-block"
                              style={{ display: cashOnDelivery ? 'block' : 'none' ,fontSize: '1.6rem',backgroundColor: 'hsl(180, 98%, 31%)', color: 'white'}}
                            >
                              Cash on Delivery
                            </button>
                            ) : ( <button id="checkout_btn" onClick={openFormHandler} className="btn btn-info" style={{ display: cashOnDelivery ? 'block' : 'none' ,fontSize: '1.6rem'}}>
                            Place Order
                          </button>
                        )}
                            {hasOrders ? (
                            <StripeCheckout stripeKey='pk_test_51OpYPPSHE9n8AgcuRSTm0lrq7x8w0PRl3CmgVIyMMQV7vS7gbV9DdX8M28a4MM8iI3HOP5ZfBzUjVcD0qRksG4K30089ImalUx'
                                   token={(token) => makePayment(token)}
                                   name={packageData.packageName}
                                   amount={allTotalAmount * 100}
                                   currency='LKR'
                                 >
                                   <button id="checkout_btn" className="btn btn-primary btn-block" style={{ display: cashOnDelivery ? 'none' : 'block', fontSize: '1.6rem',backgroundColor: 'hsl(180, 98%, 31%)', color: 'white'}}>
                                      Place Order
                                    </button>
                                  </StripeCheckout>
                                  ) : ( <button id="checkout_btn" onClick={openFormHandler} className="btn btn-primary btn-block" style={{ display: cashOnDelivery ? 'none' : 'block',fontSize: '1.6rem' }}>
                                  Place Order
                                </button>
                              )}

                                {/* {isFormOpen && (
                               <div className="popup-form">
                                 <label>
                                   User Name:
                                   <input type="text" name="userName" value={formData.userName} onChange={handleInputChange} />
                                 </label>
                                 <label>
                                   Phone No:
                                   <input type="number" name="phoneNo" value={formData.phoneNo} onChange=                       {handleInputChange} />
                                 </label>
                                 <label>
                                   Address:
                                   <input type="text" name="address" value={formData.address} onChange=                       {handleInputChange} />
                                 </label>

                                 <button  className="btn btn-success"onClick={submitFormHandler}>Submit</button>
                               </div>
                             )}
                       */}

{isFormOpen && (
  <div className="popup-form" style={{ fontSize: '1.6rem' }}>
    <label style={{ display: 'block', marginBottom: '1rem' }}>
      User Name:
      <input type="text" name="userName" value={formData.userName} onChange={handleInputChange} style={{ marginLeft: '1rem', fontSize: '1.6rem' }} />
    </label>
    <label style={{ display: 'block', marginBottom: '1rem' }}>
      Phone No:
      <input type="number" name="phoneNo" value={formData.phoneNo} onChange={handleInputChange} style={{ marginLeft: '1rem', fontSize: '1.6rem' }} />
    </label>
    <label style={{ display: 'block', marginBottom: '1rem' }}>
      Address:
      <input type="text" name="address" value={formData.address} onChange={handleInputChange} style={{ marginLeft: '1rem', fontSize: '1.6rem' }} />
    </label>

    <button className="btn btn-success" onClick={submitFormHandler} style={{ marginLeft: '1rem', fontSize: '1.6rem',backgroundColor: 'hsl(180, 98%, 31%)', color: 'white' }}>Submit</button>
  </div>
)}



                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </section>
        </div>

      ) : (
        <p>Loading...</p>
      )}
   
    </div>
  );
};

export default PackageDescription;




