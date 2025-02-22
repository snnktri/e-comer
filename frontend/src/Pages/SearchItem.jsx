import React, { useState, useContext } from 'react';
import { ShopContext } from "../Context/ShopContext/ShopContext"

const SearchItem = () => {
     const [showAddProduct, setShowAddProduct] = useState(false);
      const {products} = useContext(ShopContext);
      console.log("products: ", products);
      const [search, setSearch] = useState("");
      const [filterProdcut, setFileterProdcut] = useState([
        
      ])
    
    
      const handleChange = (e) => {
        setSearch(e.target.value);
    
        const filteredProducts = products.filter(product => product.name.toLowerCase().includes(e.target.value.toLowerCase()));
        setFileterProdcut(filteredProducts); 
      }
  return (
    <div className='flex flex-col p-5'>
      <div className="mb-6">
        <form>
          <input
            type="text"
            placeholder="Search Products"
            onChange={handleChange}
            value={search}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </form>
        
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Filtered Products</h3>
        {filterProdcut.length > 0 ? (
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
          {filterProdcut.map((product) => (
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
          ))
          }
          </tbody>
          </table>
        </div>
        ) : (
          <p>No products found matching your search.</p>
        )}
      </div>

    </div>
  )
}

export default SearchItem
