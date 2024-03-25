import React from 'react'
import { Link } from 'react-router-dom'

import 
{BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill}
 from 'react-icons/bs'

function Sidebar({openSidebarToggle, OpenSidebar}) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <BsCart3  className='icon_header'/> TRIFFICO

            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            
            <li className='sidebar-list-item'>
                <a href="/">
                    <BsGrid1X2Fill className='icon'/> Dashboard
                </a>
            </li>
            <li className='sidebar-list-item'>
             
             <Link to='/admin1/addpackageform' > 
          <BsFillArchiveFill className='icon'/> Package form
          </Link>
   
             </li>

            <li className='sidebar-list-item'>
             
            <Link to='/admin1/packagelist' > 
         <BsFillArchiveFill className='icon'/> Package List
         </Link>
  
            </li>
          

            <li className='sidebar-list-item'>
            <Link to='/admin1/bookinglist' >  <a href="">
                    <BsFillGrid3X3GapFill className='icon'/> BookingList
                </a></Link>
            </li>
            <li className='sidebar-list-item'>
            <Link to='/admin1/triplist' >  <a href="">
                    <BsFillGrid3X3GapFill className='icon'/> Trip List
                </a></Link>
            </li>
            <li className='sidebar-list-item'>
            <Link to='/admin1/users' > 
                    <BsPeopleFill className='icon'/> Users
               </Link>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsListCheck className='icon'/> Orders
                </a>

            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsMenuButtonWideFill className='icon'/> payment
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsFillGearFill className='icon'/> Setting
                </a>
            </li>
        </ul>
    </aside>
  )
}

export default Sidebar
