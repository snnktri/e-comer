import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { logInHost } from "../Services/user"
import { UserAuthContext  } from "../Context/AuthContext/userAuth";
import { useContext } from "react";
const LogIn = () => {
    const [inputData, setInputData] = useState({
        email: "",
        password: "",
        role: "user"
    })

    const handleChnage = (e) => {
        setInputData({
            ...inputData,
            [e.target.name]: e.target.value
        })
    }

    const navigate = useNavigate();
    const { setUser } = useContext(UserAuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(inputData, setUser);
            const data = await logInHost(inputData, setUser);
            if(data.success) navigate("/")
            
           
        } catch (error) {
            console.error("An error occurred")
        }
    }
    
  return (
    <div className='flex justify-center items-center min-h-screen'>
        <div className='p-6 rounded-lg shadow-lg shadow-gray-500 w-[90%] flex flex-col sm:w-[600px] bg-gray-200 gap-3 backdrop-blur-sm'>
            <h2 className='text-center text-4xl font-bold text-gray-800 py-4'>Log In as User</h2>
           
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-4'>
                    <div className=''>
                        Email: 
                        <input
                        onChange={handleChnage}
                         type='email' name='email' value={inputData.email} required placeholder='ram@gmail.com'
                        className='mt-2 w-full p-2 border border-gray-300 shadow-2xl' />
                    </div>
                    <div>
                        Password: 
                        <input
                        onChange={handleChnage}
                         type='password' name='password' value={inputData.password} required placeholder='ram12345677' 
                        className='mt-2 w-full p-2 border border-gray-300 shadow-2xl'/>
                    </div>
                    
                    <div className='flex w-full justify-center'>
                        <button 
                        type='submit'
                         className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600">
                            Log In
                        </button>
                    </div>
                    </div>
                </form>
            
        </div>
    </div>
  )
}

export default LogIn