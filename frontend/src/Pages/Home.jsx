import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { ShopContext } from "../Context/ShopContext/ShopContext";
//import { UserAuthContext } from '../Context/AuthContext/userAuth';

const Home = () => {
  const { products, addToCart, setCarts } =  useContext(ShopContext);
  
    
   // const { user } = useContext(UserAuthContext);
   // console.log("user from :",user)
   // console.log(products);

   const handleClick = async (productId) => {
    try {
     // console.log("ProductId:", productId);
      const response = await addToCart(productId);
      // if(response.success) {
       
      // }
    } catch (error) {
      console.log("Error on addToCart", error.message)
    }
   }
  return (
    <div className='bg-gray-700 w-full min-h-screen flex-col'>
        <div className='flex w-full justify-center m-2'>
            <h2 className='m-2 text-white text-3xl'>Welcome to the e-commerece website.</h2>
        </div>
        <div className='mt-2 w-full flex'>
            {/* products goes here */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {products.map((product) => (
    <div key={product._id} className="m-2">
      <div className="bg-white p-4 rounded shadow-lg flex flex-col">
        <h2 className="text-green-600 text-lg font-semibold">{product.name}</h2>
        <img
          src={product.productImage}
          alt={product.name}
          className="w-full h-[300px] object-cover bg-gray-200 rounded-md mt-4"
        />
        <p className="mt-4 text-gray-700">{product.description}</p>
        <p className="mt-2 text-xl font-bold text-gray-900">${product.price}</p>
        <button 
        onClick={()=> handleClick(product._id)}
         className="w-full bg-green-600 text-white font-medium py-2 rounded-lg hover:bg-green-700 focus:outline-none">
          Add to Cart
          </button>
      </div>
    </div>
  ))}
</div>

        </div>
    </div>
  )
}

export default Home