import React, { useState } from 'react';
import AdminLogin from './AdminLogin';
import UserLogin from './UserLogin';

const LogIn = () => {
  const [role, setRole] = useState(null); // State to manage selected role

  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole); // Update the role based on user selection
  };

  return (
    <div className='flex flex-col gap-3'>
      <h1 className='text-center text-3xl text-gray-800 font-bold'>Select Role</h1>

      {/* Buttons to select User or Admin */}
      <button className='text-blue-500 hover:text-blue-700 cursor-pointer' onClick={() => handleRoleSelection('user')}>Login as User</button>
      <button className='text-blue-500 hover:text-blue-700 cursor-pointer' onClick={() => handleRoleSelection('admin')}>Login as Admin</button>

      {/* Conditionally render AdminLogin or UserLogin based on role */}
      {role === 'admin' ? <AdminLogin /> : <UserLogin />}
    </div>
  );
};

export default LogIn;
