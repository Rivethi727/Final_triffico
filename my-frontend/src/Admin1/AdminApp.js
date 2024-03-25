
import { useState } from 'react'
import './Admin.css'

import AdminNavbar from './AdminNavbar'
import Sidebar from './Sidebar'
import AdminHome from './AdminHome'
import { Route, Routes } from 'react-router-dom'

// import User from '../Admin1/User'
// import Order from './Order'
import TotalProducts from './TotalProducts'
import ProductList from './ProductList'
import AddPackageForm from './AddPackageForm'
// import BookingList from './Booking/BookingList'


function AdminApp() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className='grid-container'>
      <AdminNavbar OpenSidebar={OpenSidebar}/>
     
    
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <Routes>
        
      
       <Route path='/admin/productlist' element={<ProductList/>}/>
        {/* <Route path='/admin1/users' element={<User />}/> */}
        {/* <Route path='/admin/orders' element={<Order />}/> */}
        <Route path='/admin/totalproducts' element={<TotalProducts />}/>
        <Route path='/admin/addpackageform' element={<AddPackageForm />}/>
        {/* <Route path='/admin1/bookinglist' element={<BookingList />}/> */}
      </Routes>
     <AdminHome/>
    </div>
  )
}

export default AdminApp