// /frontend/src/components/BookingForm.js

// import React, { useState } from 'react';
// import axios from 'axios';
// import '../styles/booking.css';
// import StripeCheckout from 'react-stripe-checkout';

// const BookingForm = ({ totalCost, modeOfTravelPrize, totalExtraServicesCost, cartItems = [] }) => {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     contactNumber: '',
//   });

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleBooking = async () => {
//     try {
//       const orderData = {
//         ...formData,
//         totalCost,
//         modeOfTravelPrize,
//         totalExtraServicesCost,
//       };

//       const response = await axios.post('http://localhost:4600/api/v1/orders/create-order', orderData);
//       console.log('Order created successfully:', response.data);

//       // Redirect or handle the success accordingly
//     } catch (error) {
//       console.error('Error creating order:', error);
//       // Handle the error accordingly
//     }
//   };

//   const makePayment = (token) => {
//     console.log("it's working good");
//     const body = {
//       token,
//       cartItems,
//     };
//     const headers = {
//       'Content-Type': 'application/json',
//     };
//     return fetch('http://localhost:4600/api/v1/payment', {
//       method: 'POST',
//       headers,
//       body: JSON.stringify(body),
//     })
//       .then((response) => {
//         console.log(response);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };
 
//   return (
//     <div className="booking-form">
//       <h3>Booking Form</h3>
//       <form>
//         {/* Your form inputs for first name, last name, email, and contact number */}
//         <input
//           type="text"
//           name="firstName"
//           placeholder="First Name"
//           value={formData.firstName}
//           onChange={handleInputChange}
//         />
//         <input
//           type="text"
//           name="lastName"
//           placeholder="Last Name"
//           value={formData.lastName}
//           onChange={handleInputChange}
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleInputChange}
//         />
//         <input
//           type="text"
//           name="contactNumber"
//           placeholder="Contact Number"
//           value={formData.contactNumber}
//           onChange={handleInputChange}
//         />
//         {/* <button type="button" className="btn btn-primary" onClick={handleBooking}>
//           Book Securely
//         </button> */}
//         <StripeCheckout
//           stripeKey="pk_test_51OpYPPSHE9n8AgcuRSTm0lrq7x8w0PRl3CmgVIyMMQV7vS7gbV9DdX8M28a4MM8iI3HOP5ZfBzUjVcD0qRksG4K30089ImalUx"
//           token={(token) => makePayment(token)}
//           name={cartItems.length > 0 ? cartItems[0].product.name : 'Default Name'}
//           amount={cartItems.length > 0 ? cartItems[0].product.price * 100 : 0}
//         >
//           <button id="checkout_btn" className="btn btn-primary btn-block">
//             Place All Order
//           </button>
          
//         </StripeCheckout>
//         <button id="checkout_btn" className="btn btn-primary btn-block">
//             Booknow
//           </button>
//       </form>
//     </div>
//   );
// };

// export default BookingForm;
