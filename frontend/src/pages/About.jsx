import React from 'react'
import Title from '../components/Title'
import assets from '../assets/assets'
import NewsLetter from '../components/NewsLetter'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={"ABOUT"} text2={" US"}></Title>

      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img src={assets.about_img} className='w-full md:max-w-[450px]' alt="" />
        <div className='flex flex-col justify-centergap-6 md:w-2/4 text-gray-600'>
        <p>Welcome to Forever, your one-stop destination for all things fashion, electronics, home essentials, and more!

At Forever, we believe shopping should be simple, secure, and satisfying. Our goal is to bring top-quality products from trusted brands right to your doorstep — at prices you’ll love.

With a seamless user experience, fast delivery, and dedicated customer support, we make online shopping not just convenient, but truly enjoyable.

Whether you’re looking for the latest trends, gadgets, or everyday essentials, ShopEase is here to make your life easier, one click at a time.</p>
    <b className='text-gray-800 mt-5 py-2'>OUR MISSION</b>
    <p>We connect customers with a wide range of curated products — from fashion to electronics — ensuring quality, affordability, and satisfaction in every purchase.

With our secure payment system, quick delivery, and responsive support, we’re here to make shopping smoother and smarter than ever.</p>
        </div>

      </div>
      <div className='text-xl py-4'>
        <Title text1={'WHY '} text2={'CHOOSE US?'}></Title>
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>QUALITY ASSURANCE</b>
          <p className='text-gray-600'>We believe that shopping is more than buying — it’s about the experience. That’s why we focus on fast shipping, easy returns, and 24/7 support to make your journey with us perfect from start to finish.</p>

        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience</b>
          <p className='text-gray-600'>Every product on our site is chosen with care, keeping your comfort, style, and happiness in mind.</p>
          
        </div>
         <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service</b>
          <p className='text-gray-600'>We connect customers with a wide range of curated products — from fashion to electronics — ensuring quality, affordability, and satisfaction in every purchase.</p>
          
        </div>
        
      </div>
       <NewsLetter></NewsLetter>
    </div>
  )
}

export default About