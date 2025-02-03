import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../Services/user';


const SignUp = () => {
  const [inputData, setInputData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await registerUser(inputData); // await the async call
      console.log(data);

      if (data.success) {
        setInputData({
          username: "",
          email: "",
          password: ""
        });
        navigate("/login"); // Redirect to login if registration is successful
      }
    } catch (error) {
      console.log("Error registering user", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="bg-gray-200 p-6 rounded-lg shadow-lg shadow-gray-500 w-[90%] sm:w-[400px] backdrop-blur-md">
        <h1 className="text-center text-4xl font-bold text-gray-800 py-4">Sign Up</h1>
        <form>
          <div className="flex flex-col gap-4">
            <div>
              Username:
              <input
                type="text"
                name="username"
                value={inputData.username}
                onChange={handleInputChange}
                placeholder="ram"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              Email:
              <input
                type="email"
                name="email"
                value={inputData.email}
                onChange={handleInputChange}
                placeholder="ram@gmail.com"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              Password:
              <input
                type="password"
                name="password"
                value={inputData.password}
                onChange={handleInputChange}
                placeholder="ram1234578"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600"
                onClick={handleSubmit}
              >
                Sign Up
              </button>
            </div>
          </div>
        </form>
        <div>
          <p className="text-center text-gray-600">
            Already have an account? <Link className='text-blue-700' to="/login" >Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
