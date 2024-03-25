// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ProductList = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get('http://localhost:7000/api/v1/products');
//         setProducts(response.data.products);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const deleteProduct = async (productId) => {
//     try {
//       await axios.delete(`http://localhost:7000/api/v1/product/${productId}`);
//       setProducts(products.filter(product => product._id !== productId));
//     } catch (error) {
//       console.error('Error deleting product:', error);
//     }
//   };

//   return (
//     <div>
        
//       <h2 className='details'>Product List</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Price</th>
//             <th>Description</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map(product => (
//             <tr key={product._id}>
//               <td>{product._id}</td>
//               <td>{product.name}</td>
//               <td>{product.price}</td>
//               <td>{product.description}</td>
//               <td>
//                 <button>Edit</button>
//                 <button onClick={() => deleteProduct(product._id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ProductList;
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import '../styles/list.css'

// const AdminDashboard = () => {
//   const [packages, setPackages] = useState([]);

//   useEffect(() => {
//     const fetchPackages = async () => {
//       try {
//         const response = await axios.get('http://localhost:4500/api/v1/getAll-packages');
//         setPackages(response.data);
//       } catch (error) {
//         console.error('Error fetching packages:', error);
//       }
//     };

//     fetchPackages();
//   }, []);

//   return (
//     <div className="admin-dashboard">
//       <h2>Package List - Admin Dashboard</h2>
//       <table className="admin-table">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Package Name</th>
//             <th>Package Image</th>
//             {/* Add more columns as needed */}
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {packages.map((packageItem, index) => (
//             <tr key={index}>
//               <td>{packageItem._id}</td>
//               <td>{packageItem.packageName}</td>
//               <td>
//                 {packageItem.packageImage && packageItem.packageImage.length > 0 && (
//                   <img src={packageItem.packageImage} alt={`package-${index + 1}`} className="package-image" />
//                 )}
//               </td>
//               {/* Add more columns based on package data */}
//               <td>
//                 <button>Edit</button>
//                 <button>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AdminDashboard;
