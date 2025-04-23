import React from 'react'
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-white border-y">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <Link to="/" className="flex items-center">
                            <img
                                src="Images/logo1.png"
                                className="mr-3 h-16"
                                alt="Logo"
                            />
                        </Link>
                    </div>
                    <div>
                    <ul className="flex flex-wrap justify-center space-x-4">
                        <li>
                            <Link to="/" className="text-gray-600 hover:text-gray-800">Home</Link>
                        </li>
                        <li>
                            <Link to="/about" className="text-gray-600 hover:text-gray-800">About</Link>
                        </li>
                        <li>
                            <Link to="/contact" className="text-gray-600 hover:text-gray-800">Contact</Link>
                        </li>
                    </ul>
                </div>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
               
                <div className="sm:flex sm:items-center sm:justify-between w-full">
                    <span className="text-sm text-gray-500 flex justify-center sm:text-center text-center">
                        © 2023
                        <a href="/" className="hover:underline">
                            E-commerce
                        </a>
                        . All Rights Reserved.
                    </span>
                </div>
            </div>
        </footer>
    );
}