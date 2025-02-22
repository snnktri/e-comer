import React, { useContext, useState} from 'react';
import { ShopContext } from "../Context/ShopContext/ShopContext"

const AdminDasBoard = () => {
  const {products} = useContext(ShopContext);


  return (
    <div className="min-h-screen bg-gray-100">
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">Admin Dashboard</h2>


      {/* Products Table */}
      <div>
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Products</h3>
        <div className="overflow-x-auto bg-white p-6 shadow-lg rounded-lg">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-600">
                <th className="py-3 px-4 border-b">Product Name</th>
                <th className="py-3 px-4 border-b">Price</th>
                <th className="py-3 px-4 border-b">Description</th>
                <th className="py-3 px-4 border-b">Category</th>
                <th className="py-3 px-4 border-b">Product Image</th>
                <th className="py-3 px-4 border-b">Stock</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b">{product.name}</td>
                  <td className="py-3 px-4 border-b">{product.price}</td>
                  <td className="py-3 px-4 border-b">{product.description}</td>
                  <td className="py-3 px-4 border-b">{product.category.name}</td>
                  <td className="py-3 px-4 border-b">
                    <img
                      src={product.productImage}
                      alt={product.name}
                      className="w-16 h-16 object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                    />
                  </td>
                  <td className="py-3 px-4 border-b">{product.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);
}

export default AdminDasBoard





