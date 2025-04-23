import React from 'react'

const SuccessPage = () => {
  return (
    <div className='flex justify-center items-center bg-gray-100 min-h-screen'>
      <div>
        <h1 className='text-3xl text-green-500'>Payment Successful!</h1>
        <p>Thank you for your purchase. You will receive an email confirmation shortly.</p>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mt-4'
        onClick={() => window.location.href='/'}>
          Continue Shopping
        </button>
      </div>
    </div>
  )
}

export default SuccessPage
