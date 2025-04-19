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
    <div className="container flex flex-col sm:flex-row gap-8 min-h-screen mt-4">
    {/* Cart Items */}
    <div className="grid grid-cols-2 sm:grid-cols-4 w-full items-center justify-around bg-gray-300">
    {carts.items.map((item, index) => (
  <div key={item.productId._id} className="flex items-center justify-center flex-col gap-1">
    <div className="p-4 border border-gray-300 bg-gray-100 rounded-md shadow-2xl flex items-center justify-center flex-col">
      <img
        src={item.productId.productImage}
        alt={item.productId.name}
        className="w-[100px] h-[100px] object-cover rounded-md"
      />
      <h3 className="text-lg font-semibold">{item.productId.name}</h3>
      <p className="text-sm">Price: {item.productId.price}</p>
      <p className="text-sm">Quantity: {item.quantity}</p>
      <h2 className="text-xl font-semibold">Total Price: {item.productId.price * item.quantity}</h2>
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