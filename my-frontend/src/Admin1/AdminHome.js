import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill } from 'react-icons/bs';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import '../styles/card.css'

function AdminHome() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await axios.get('http://localhost:4500/api/v1/products');
        setTotalProducts(productsResponse.data.products.length);

        const usersResponse = await axios.get('http://localhost:4500/api/users');
        setTotalUsers(usersResponse.data.length);

        const ordersResponse = await axios.get('http://localhost:4500/api/orders');
        setTotalOrders(ordersResponse.data.length);

        // const bookingResponse = await axios.get('http://localhost:4500/api/getbooking/admin1');
        // setTotalOrders(ordersResponse.data.length);


      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>DASHBOARD</h3>
      </div>

      <div className='main-cards'>
        <div className='card'>
          <div className='card-inner'>
            <h3>PACKAGE</h3>
            <p>{totalProducts}</p>
            <BsFillArchiveFill className='card_icon' />
          </div>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>USERS</h3>
            <p>{totalUsers}</p>
            <BsPeopleFill className='card_icon' />
          </div>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>ORDERS</h3>
            <p>{totalOrders}</p>
            <BsFillGrid3X3GapFill className='card_icon' />
          </div>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>CreatePackage</h3>
            <p>{totalOrders}</p>
            <BsFillGrid3X3GapFill className='card_icon' />
          </div>
        </div>
      </div>

      <div className='charts'>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            width={500}
            height={300}
            data={[
              { name: 'Products', value: totalProducts },
              { name: 'Users', value: totalUsers },
              { name: 'Orders', value: totalOrders },
            ]}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            width={500}
            height={300}
            data={[
              { name: 'Products', value: totalProducts },
              { name: 'Users', value: totalUsers },
              { name: 'Orders', value: totalOrders },
            ]}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}

export default AdminHome;
