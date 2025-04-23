import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const AdminPannel = () => {
  return (
    <div className='flex gap-3 min-h-screen'>
        {/* Side menue  left ribbon*/}
      <div className='w-64 flex flex-col bg-gray-200  border-r-1 border-gray-700'>
        <h2 className='w-full text-center block border-b-1 whitespace-nowrap p-2 text-md text-gray-800'>Admin Dashboard </h2>
        <ul className='flex flex-col p-2 items-center w-full'>
  <li className='w-full'>
    <NavLink 
      to='search' 
      className='block w-full text-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition'
    >
      Search
    </NavLink>
  </li>
  <li className='w-full mt-2'>
    <NavLink 
      to='productManage' 
      className='block w-full text-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition'
    >
      Products
    </NavLink>
  </li>
  <li className='w-full mt-2'>
    <NavLink 
      to='addnew' 
      className='block w-full text-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition'
    >
      Add New
    </NavLink>
  </li>
</ul>

      </div>
  
      <div className='flex-grow bg-white'>
        <Outlet />
      </div>
    </div>
  )
}

export default AdminPannel
