import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const Footer = () => {
  return (
    <div className=''>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 mt-40 text-sm py-5'>
            <div>
                <img src={assets.logo} className='mb-5 w-32' alt="" />
                <p className='w-full md:w-2/3 text-gray-600'>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione eius cupiditate id eaque. Tempora fugiat, tenetur illo porro id ratione possimus ab voluptatum iure repudiandae eligendi deleniti non assumenda omnis?
                </p>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Private Policy</li>
                </ul>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>+91 931-684-7190</li>
                    <li>akshay.dev307@gmail.com</li>
                </ul>
            </div>
        </div>
        <div>
            <hr className='text-gray-200'/>
            <p className='py-5 text-sm text-center'>Copyright 2026&copy; forever.com - All Rights Reserved
            </p>
        </div>
    </div>
  )
}

export default Footer