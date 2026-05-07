import React from 'react'

const Footer = () => {
  return (
    <div className=''>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 mt-40 text-sm py-5'>
            <div>
                <h2 className='prata-regular text-2xl text-[#1a1a2e] mb-5'>TIERCE</h2>
                <p className='w-full md:w-2/3 text-gray-500 leading-relaxed'>
                Tierce is your destination for premium fashion and lifestyle products. We curate the finest collections from around the world, bringing you quality, style, and unmatched elegance at your fingertips.
                </p>
            </div>
            <div>
                <p className='text-base font-semibold mb-5 text-[#1a1a2e] uppercase tracking-wider'>Company</p>
                <ul className='flex flex-col gap-2 text-gray-500'>
                    <li className='hover:text-[#e8a87c] cursor-pointer transition-colors'>Home</li>
                    <li className='hover:text-[#e8a87c] cursor-pointer transition-colors'>About us</li>
                    <li className='hover:text-[#e8a87c] cursor-pointer transition-colors'>Delivery</li>
                    <li className='hover:text-[#e8a87c] cursor-pointer transition-colors'>Privacy Policy</li>
                </ul>
            </div>
            <div>
                <p className='text-base font-semibold mb-5 text-[#1a1a2e] uppercase tracking-wider'>Get in Touch</p>
                <ul className='flex flex-col gap-2 text-gray-500'>
                    <li>+91 931-684-7190</li>
                    <li>support@tierce.in</li>
                </ul>
            </div>
        </div>
        <div>
            <hr className='border-[#e5e1db]'/>
            <p className='py-5 text-sm text-center text-gray-400'>Copyright 2026&copy; Tierce — All Rights Reserved
            </p>
        </div>
    </div>
  )
}

export default Footer