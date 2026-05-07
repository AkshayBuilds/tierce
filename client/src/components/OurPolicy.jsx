import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-sm sm:text-sm md:text-base text-gray-700'>

        <div className='group'>
            <img src={assets.exchange_icon} className='w-12 m-auto mb-5 group-hover:scale-110 transition-transform' alt="Easy exchange" />
            <p className='font-semibold text-[#1a1a2e]'>Easy Exchange Policy</p>
            <p className='text-gray-400'>Hassle-free exchange within 14 days</p>
        </div>
        <div className='group'>
            <img src={assets.quality_icon} className='w-12 m-auto mb-5 group-hover:scale-110 transition-transform' alt="Return policy" />
            <p className='font-semibold text-[#1a1a2e]'>7 Days Return Policy</p>
            <p className='text-gray-400'>Easy returns with full refund guarantee</p>
        </div>
        <div className='group'>
            <img src={assets.support_img} className='w-12 m-auto mb-5 group-hover:scale-110 transition-transform' alt="Customer support" />
            <p className='font-semibold text-[#1a1a2e]'>24/7 Customer Support</p>
            <p className='text-gray-400'>We're here for you, anytime you need</p>
        </div>

    </div>
  )
}

export default OurPolicy