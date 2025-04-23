import React, { useState, useContext } from 'react';
import { ShopContext } from "../Context/ShopContext/ShopContext";
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet'; 

const Home = () => {
  const { products, addToCart } = useContext(ShopContext);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);
  const navigate = useNavigate();

  const handleClick = async (productId) => {
    try {
      await addToCart(productId);
    } catch (error) {
      console.log("Error on addToCart", error.message);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const handleClickForPage = (product) => {
    console.log(product);
    navigate('/productPage', {
      state: { product }
    });
  }

  return (
    <>
    <Helmet>
    <title>Watch-Wave</title>
    <meta name="description" content="Welcome to watch-wave, your watch will build your personality." />
    <meta property="og:title" content="Watch-Wave" />
    <meta property="og:description" content="Shop the best deals now!" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="http://localhost:5175/" />
    <meta name="keywords" content="watches, luxury watches, stylish watches, watch shop, watch-wave" />
    <meta name="author" content="Watch-Wave Team" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charset="UTF-8" />
  </Helmet>
    <div className='bg-gray-300 w-full min-h-screen flex-col'>
      <div className='flex w-full items-center m-2 flex-col'>
        <h2 className='m-2 text-gray-800 text-3xl block'>Welcome to the Watch-Wave</h2>
        <p className='text-gray-700 text-lg italic block'>Where time meets style — discover your perfect match.</p>
      </div>

      <div className='mt-2 w-full flex justify-center'>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentProducts.map((product) => (
            <div key={product._id} className="m-2 p">
              <div className="bg-white p-4 rounded shadow-lg flex flex-col">
                <h2 className="text-green-600 text-lg font-semibold">{product.name}</h2>
                <img
                  src={product.productImage}
                  alt={product.name}
                  className="w-full h-[300px] object-cover bg-gray-200 rounded-md mt-4 cursor-pointer"
                  onClick={() =>handleClickForPage(product)}
                />
                <p className="mt-4 text-gray-700">{product.description}</p>
                <p className="mt-2 text-xl font-bold text-gray-900">${product.price}</p>
                <button 
                  onClick={() => handleClick(product._id)}
                  className="w-full bg-green-600 text-white font-medium py-2 rounded-lg hover:bg-green-700 focus:outline-none">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* next previous button */}
      <div className='flex justify-center items-center mt-8 space-x-4'>
        <button 
          onClick={goToPreviousPage} 
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-400' : 'bg-white text-black hover:bg-gray-200'}`}>
          Previous
        </button>
        <span className='text-white text-lg'>
          Page {currentPage} of {totalPages}
        </span>
        <button 
          onClick={goToNextPage} 
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-400' : 'bg-white text-black hover:bg-gray-200'}`}>
          Next
        </button>
      </div>
    </div>
    </>
  );
};

export default Home;
