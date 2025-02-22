import React from 'react';
import aboutImage from "../assets/imageforabout.jpg";

const About = () => {
  return (
    <div className='flex bg-gray-100 min-h-screen flex-col sm:flex-row gap-8 p-4'>
      {/* About section */}
      <div className='flex-1 max-w-xl text-center sm:text-left flex-wrap'>
        <h1 className='text-4xl text-orange-500 font-semibold mb-4'>
          About Us
        </h1>
        <p className='text-gray-500 text-lg sm:text-base sm:mt-10'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id consectetur justo.
          Donec facilisis urna eget diam pharetra, id consectetur risus fermentum. Sed vulputate,
          ipsum vitae eleifend ullamcorper, mauris dui ullamcorper velit, id sagittis nisi ex nec urna.
          Nulla facilisi. Nulla facilisi. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum illo eum earum mollitia,
          perspiciatis necessitatibus reiciendis ipsam quas, molestiae maxime minima aliquid, veniam iste? Earum perferendis quas libero
          similique itaque. Hic quo nisi tenetur magni cum sequi iste eum? Excepturi dolor rerum delectus corporis iste voluptatibus
          magnam sunt fugit. Corrupti accusantium mollitia recusandae vitae laboriosam commodi est debitis nisi voluptatum.
        </p>
      </div>

      {/* Image section */}
      <div className='flex-1 max-w-xl'>
        <img 
          src={aboutImage} 
          alt="About Us" 
          className="object-cover w-full h-full sm:h-[80%] rounded-2xl shadow-2xl shadow-gray-800" 
        />
      </div>
    </div>
  )
}

export default About;
