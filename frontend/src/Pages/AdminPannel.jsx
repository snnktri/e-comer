import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const AdminPannel = () => {
  return (
    <div className='flex gap-3 min-h-screen'>
        {/* Side menue  left ribbon*/}
      <div className='w-64 flex flex-col bg-gray-200  border-r-1 border-gray-700'>
        <h2 className='w-full text-center block border-b-1 whitespace-nowrap p-2 text-md text-gray-800'>Admin Dashboard </h2>
        <ul>
          <li>
            <NavLink to='search'>
              Search
            </NavLink>
            
          </li>
          <li>
          <NavLink to='productManage'>
              Products
            </NavLink>
          </li>
          <li>
            <NavLink to='addnew'>
              Add New
            </NavLink>
          </li>
          <li></li>
        </ul>
      </div>
      {/* canvas to for admin function result right bar */}
      <div className='flex-grow bg-white'>
        <Outlet />
      </div>
    </div>
  )
}

export default AdminPannel
