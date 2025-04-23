import React, {useState, useEffect, useContext} from 'react';
import { placeOrder } from "../Services/orderApi"
import { ShopContext } from '../Context/ShopContext/ShopContext';
import { UserAuthContext } from '../Context/AuthContext/userAuth';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';;


const Order = () => {
    const { carts, clearCart, setCarts } = useContext(ShopContext);
    const { user } = useContext(UserAuthContext);
    const [address, setAddress] = useState("");
    const [payment, setPayment] = useState("e-sewa");
    const navigate = useNavigate();

   // console.log(carts);
    const handleSubmit = async(e) => {
      e.preventDefault();

      console.log(carts);

      console.log(address);
      console.log(payment);

      if(payment === "") {
        toast.warning("Please enter a payment method");
        return;
      }
        try {
          console.log("Address: ", address);
          const response = await placeOrder(address);
           console.log("submitting the order");
           console.log(response);
           if(response.success){
            await clearCart();
            if(response.data.url){
              window.location.href = response.data.url;
            }else{
              toast.success('Order Placed');
              navigate('/');
            }
           
          }else{
            toast.error("Payment Failed.");
          }
        } catch (error) {
            console.error("Eerror on placed order", error);
        }
    }
  return (
    <div className="container flex flex-col sm:flex-row gap-8 min-h-screen mt-4 p-4">
    {/* Cart Items */}
    <div className="flex flex-col w-full items-center justify-center bg-gray-300 p-4 space-y-6">
  {carts.items.map((item, index) => (
    <div key={item.productId._id} className="flex w-full justify-center sm:p-4">
      <div className="w-full max-w-lg p-6 bg-white border border-gray-300 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
        
        {/* Product Image */}
        <img
          src={item.productId.productImage}
          alt={item.productId.name}
          className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 object-cover rounded-md mx-auto"
        />

        {/* Product Name */}
        <h3 className="mt-4 text-xl font-semibold text-gray-800 text-center">{item.productId.name}</h3>

        {/* Price and Quantity */}
        <div className="mt-2 text-center space-y-1">
          <p className="text-sm text-gray-600">Price: <span className="font-bold">${item.productId.price.toFixed(2)}</span></p>
          <p className="text-sm text-gray-600">Quantity: <span className="font-bold">{item.quantity}</span></p>
        </div>

        {/* Total Price */}
        <h2 className="mt-4 text-2xl font-semibold text-green-600 text-center">
          Total Price: <span className="text-xl font-bold">${(item.productId.price * item.quantity).toFixed(2)}</span>
        </h2>

        {/* Optionally, Add to Cart Button */}
        <div className="mt-6 flex justify-center">
          <button className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition duration-200">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  ))}
</div>

  
    {/* Order Form */}
    <div className="min-w-full md:min-w-[30%] flex flex-col items-center">
      <div className='mt-2'>Order Details: </div>
  <form onSubmit={handleSubmit} className="space-y-4">
    <div>
      Name: <span className='mt-2 ml-2'>{user}</span>
    </div>
    <div>
      Total Price:<span className='mt-2 ml-2'>{carts.totalPrice}</span>
    </div>
    <div>
      Address:
      <input
        type="text"
        name="address"
        value={address}
        placeholder='Enter your shipping address'
        onChange={(e) => setAddress(e.target.value)}
        className="ml-2 w-72 p-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  <div className="mt-4">
    <label htmlFor="paymentMethod" className="mr-4">
      Select Payment Method:
    </label>
    <select
      id="paymentMethod"
      name="paymentMethod"
      onChange={(e) => setPayment(e.target.value)}
      className="p-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="eSewa">E-Sewa</option>
      {/* More payment options can go here */}
    </select>
  </div>
    <div>
      <button
        type="submit"
        className="w-72 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Place Order
      </button>
    </div>
  </form>
</div>

  </div>
  

  )
}

export default Order