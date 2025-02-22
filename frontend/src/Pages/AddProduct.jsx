import React, { useContext, useState } from 'react';
import { addP, addCatF } from '../Services/Product';
import { ShopContext } from "../Context/ShopContext/ShopContext";

const AddProduct = () => {
  const { products } = useContext(ShopContext);
  const [isProductAdd, setIsProductAdd] = useState(true);
  const [addCat, setIsCat] = useState({
    name:""
  })

  const [addProduct, setAddProduct] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    productImage: null,
    stock: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
  
    setAddProduct((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value, // Handle file and other types
    }));
  };

  const handleInputChangeforcat = (e) => {
    setIsCat({
      ...addCat, // Spread the current state to retain other properties
      [e.target.name]: e.target.value // Corrected 'e.target' and updated state
    });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("form data:", addProduct);
    try {
     

      const res = await addP(addProduct);

      console.log(res);

      if (res.success) {
        console.log("Product added successfully");
        setAddProduct({
          name: "",
          price: "",
          description: "",
          category: "",
          productImage: null,
          stock: "",
        });
        
      } else {
        console.log("Failed to add product: ", res.data.message);
      }
    } catch (error) {
      console.error("Product add failed: ", error);
    }
  };

  const handleSubmitcat = async (e) => {
    e.preventDefault();
    console.log("form data:", addCat);
    try {
      const res = await addCatF(addCat);
      console.log(res);
      if (res.success) {
        console.log("Category added successfully");
        setIsCat({
          name: ""
        });
        
      } else {
        console.log("Failed to add category: ", res.data.message);
      }
    } catch (error) {
      console.error("Category add failed: ", error);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        {isProductAdd ? "Add Prodduct" : "Add Categories"}
        </h2>

        <div className="flex justify-center mb-6">
  <button
    onClick={() => setIsProductAdd(!isProductAdd)} // Toggle the state
    className="px-4 py-2 rounded-md bg-blue-500 text-white"
  >
    {isProductAdd ? "Add Category" : "Add Product"}
  </button>
</div>
     {
      isProductAdd? (
        <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-lg font-medium">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={addProduct.name}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-lg font-medium">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={addProduct.price}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-lg font-medium">Description:</label>
          <textarea
            id="description"
            name="description"
            value={addProduct.description}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div>
          <label htmlFor="category" className="block text-lg font-medium">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={addProduct.category}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="productImage" className="block text-lg font-medium">Product Image:</label>
          <input
            type="file"
            id="productImage"
            name="productImage"
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="stock" className="block text-lg font-medium">Stock:</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={addProduct.stock}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Product
          </button>
        </div>
      </form>
      ): (
        <form onSubmit={handleSubmitcat} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-lg font-medium">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={addCat.name}
            onChange={handleInputChangeforcat}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Category
          </button>
        </div>
      </form>
      )
     }
     
    </div>
  );
};

export default AddProduct;
