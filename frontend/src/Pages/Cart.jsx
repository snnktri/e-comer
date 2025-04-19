import React from 'react';
import { ShopContext } from '../Context/ShopContext/ShopContext';
import { UserAuthContext } from '../Context/AuthContext/userAuth';
import { useContext } from 'react';
import { Link } from "react-router-dom"

const Cart = () => {
  const { user } = useContext(UserAuthContext);
  const { carts, removeFromCart, updateCart } = useContext(ShopContext);
//console.log(carts.items[0].productId.productImage)
 // console.log('I am from the cart component', carts);
 //console.log("user from cart:", user);
 console.log(carts.items);

  const handleRemoveFromCart = async (productId) => {
    try {
      removeFromCart(productId);
    } catch (
      error
    ) {
      console.error("Error on removing product from cart")
    }
  }

  const handleQuantityChange = async (productId, quantity) => {
    try {
      await updateCart(productId, quantity);
      console.log("Quantity changed successfully");
    } catch (error) {
      console.error("Error on updating cart quantity", error);
    }
  }
  if(!user) {
    return (
      <div className='min-h-screen w-full flex justify-center items-center bg-gray-400'>
        <h1 className='text-center text-4xl font-bold'>Please Sign In to View Your Cart!! </h1>
        <Link to="/signup" className='flex justify-center pl-2 text-blue-500 cursor-pinter'>
           Sign Up
        </Link>
      </div>
    )
  }
  return (
    <div className='flex bg-gray-400 min-h-screen w-full justify-center flex-col gap-2'>
      <div className='flex flex-col items-center p-5 w-[80%] sm:w-[90%] bg-gray-200 m-4 rounded-2xl shadow-2xl shadow-gray-700'>
        <h1 className='text-4xl font-bold'>{user} Cart</h1>
        {carts.items.length === 0 ? (
    <p>Your cart is empty. Start shopping now!</p>
) : (
  <table className="min-w-full table-auto border-collapse">
  <thead>
    <tr className="text-center">
      <th className="px-4 py-2">Remove Item</th>
      <th className="px-4 py-2">Product</th>
      <th className="px-4 py-2">Quantity</th>
      <th className="px-4 py-2">Price</th>
      <th className="px-4 py-2">Total</th>
    </tr>
  </thead>
  <tbody>
  {carts.items.map((item, index) => {
  
  if (!item.productId || !item.productId._id || !item.productId.productImage || !item.productId.price) {
    return <tr key={item.productId._id}><td colSpan="5">Missing data for product</td></tr>;
  }

  return (
    <tr
      key={item.productId._id}
      className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} border-b`}
    >
      <td className="px-4 py-2 text-center">
        <button
          onClick={() => handleRemoveFromCart(item.productId._id)}
          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
        >
          Remove
        </button>
      </td>
      <td className="px-4 py-2 flex justify-center items-center">
      <img
  src={item.productId.productImage}
  alt={item.productId.name}
  className="w-[300px] h-[100px] sm:h-[300px] object-cover rounded-xl"
/>

      </td>
      <td className="px-4 py-2 text-center">
        <input
          type="number"
          min="1"
          value={item.quantity}
          onChange={(e) => handleQuantityChange(item.productId._id, e.target.value)}
          className="w-16 p-1 border rounded-md text-center"
        />
      </td>
      <td className="px-4 py-2 text-center">${item.productId.price.toFixed(2)}</td>
      <td className="px-4 py-2 text-center">
        ${(item.productId.price * item.quantity).toFixed(2)}
      </td>
    </tr>
  );
})}

  </tbody>
  <tfoot>
  <tr className="bg-gray-200">
    <td colSpan="4" className="text-right px-4 py-2">Total Price:</td>
    <td className="text-center px-4 py-2">${carts.totalPrice.toFixed(2)}</td>
  </tr>
</tfoot>
</table>

      )}
      </div>
      <div className='flex items-center justify-center p-2'>
        <Link to="/checkout" className='flex justify-center items-center bg-blue-500 p-5 w-[300px] rounded-xl hover:bg-blue-700 text-white text-xl capitalize'>
        checkOut
        </Link>
      </div>
    </div>
  )
}

export default Cart