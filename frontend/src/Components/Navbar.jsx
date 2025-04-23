import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import { GrCart } from "react-icons/gr";
import { useContext } from 'react';
import { UserAuthContext } from '../Context/AuthContext/userAuth';
import { ShopContext } from '../Context/ShopContext/ShopContext';
import { adminAuthContext } from '../Context/AuthContext/adminAuth';




const Navbar = () => {
  const { itemsNumber}  = useContext(ShopContext);
  const {user, logOutHost }= useContext(UserAuthContext);
  const {admin, logout } = useContext(adminAuthContext);
  
  console.log("user: ",user);

 console.log("admin: ", admin);
 // console.log("user: ", user);
  return (
   <header className='sticky shadow top-0 z-50'>
    <nav className='bg-white border-gray-200 px-4 lg:px-6 py-2.5'>
      <div className='flex flex-wrap justify-between items-center mx-auto max-w-screen-xl'>
        {/* logo and names goes here */}
        <div className='flex items-center'>
          <Link to="/" alt="Logo">
          <img className="mr-3 h-16" src="Images/logo1.png" alt="Logo" />
          </Link>
          <Link to="/" className='ml-4 text-xl text-gray-800 hover:text-gray-900'>
            Watch-Wave
          </Link>
        </div>
        <div className='flex items-center lg:order-2'>
        {
        !user && !admin ? (
          <Link
            to="/login"
            className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
          >
            Log In
          </Link>
        ) : (
          <div className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none">
            {/* If admin is logged in */}
            {admin ? (
              <button className="cursor-pointer" onClick={() => logout()}>
                Logout
              </button>
            ) : (
              // If user is logged in
              <button className="cursor-pointer"  onClick={() => logOutHost()}>
                Logout
              </button>
            )}
          </div>
        )
      }
          <Link to="/signup"
          className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none">
          Sign Up
          </Link>
          <Link to="/cart" className="relative">
            <div className="relative flex items-center justify-center p-2 shadow-md hover:shadow-xl rounded-full transition-all">
                <GrCart className="h-6 w-6 text-gray-600 hover:text-gray-800 transition-all" />
                <span className="absolute top-[-5px] right-[-5px] bg-blue-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white hover:bg-blue-600">
                    { !user? "0" : `${itemsNumber}`}
                </span>
            </div>
        </Link>
        </div>
        <div className='hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1'>
        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                 <NavLink
                 to="/"
                 className={({ isActive }) =>
                  `block py-2 pr-4 pl-3 duration-200 border-b ${isActive ? "text-orange-700" : "text-gray-700"} border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                }
                      >
                       Home
                    </NavLink>
               </li>
               <li>
                 <NavLink
                 to="/contact"
                 className={({ isActive }) =>
                  `block py-2 pr-4 pl-3 duration-200 border-b ${isActive ? "text-orange-700" : "text-gray-700"} border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                }
                      >
                       Contact
                    </NavLink>
               </li>
               <li>
                 <NavLink
                 to="/about"
                 className={({ isActive }) =>
                  `block py-2 pr-4 pl-3 duration-200 border-b ${isActive ? "text-orange-700" : "text-gray-700"} border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                }
                      >
                       About
                    </NavLink>
               </li>
                              {
                  admin ? (
                    <li>
                      <NavLink
                        to="/admin"
                        className={({ isActive }) =>
                          `block py-2 pr-4 pl-3 duration-200 border-b ${isActive ? "text-orange-700" : "text-gray-700"} border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                        }
                      >
                        Admin Panel
                      </NavLink>
                    </li>
                  ) : null
                }

            </ul>
        </div>
      </div>
    </nav>
   </header>
  );
};

export default Navbar;
