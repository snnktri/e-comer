import React, { useContext} from 'react';
import { useLocation } from 'react-router-dom';
import { ShopContext } from "../Context/ShopContext/ShopContext";

const Items = () => {
    const { addToCart } = useContext(ShopContext)
    const location = useLocation();
    const { product } = location.state || {};
    console.log(product);

    if (!product) {
        return <div>Product not found!</div>;
      }

      const handleClick = async (productId) => {
        try {
          await addToCart(productId);
        } catch (error) {
          console.log("Error on addToCart", error.message);
        }
      };
  return (
    <div className="min-h-screen bg-gray-800 p-6 flex justify-center items-center">
    <div className="bg-white rounded-md shadow-lg max-w-4xl w-full p-8 flex flex-col sm:flex-row">
      {/* Product Image */}
      <img
        src={product.productImage}
        alt={product.name}
        className="w-full sm:w-1/2 object-cover rounded-md mb-6 sm:mb-0"
      />

      {/* Product Details */}
      <div className="sm:ml-6 flex flex-col items-center sm:items-start">
        <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
        <p className="mt-2 text-gray-600 text-xl">
          <strong>Category:</strong> {product.category?.name || "No category"}
        </p>
        <p className="mt-4 text-gray-700">{product.description}</p>
        <p className="mt-4 text-xl font-semibold text-green-700">
          Price: ${product.price}
        </p>
        <p className="mt-2 text-gray-600">Stock: {product.stock}</p>

        {/* Additional Information */}
        <div className="mt-6 flex justify-center sm:justify-start">
          <button
          onClick={() => handleClick(product._id)} className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 cursor-pointer">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Items
