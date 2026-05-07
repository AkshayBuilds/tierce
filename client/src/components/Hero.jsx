import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/Shopcontext'

const Hero = () => {
  const { navigate } = useContext(ShopContext)

  return (
    <div className='flex flex-col sm:flex-row border border-[#e2e8f0] rounded-xl overflow-hidden bg-white shadow-sm min-h-120'>
      
      {/* Left Side - Text */}
      <div className='w-full sm:w-1/2 flex items-center justify-center py-14 sm:py-0 px-10 sm:px-14 bg-white'>
        <div className='text-[#0f172a] max-w-sm'>
          
          {/* Tag line */}
          <div className='flex items-center gap-3 mb-5'>
            <div className='w-8 h-0.5 bg-[#3b82f6]'></div>
            <p className='text-xs font-semibold tracking-[0.2em] uppercase text-[#3b82f6]'>New Season 2025</p>
          </div>

          {/* Heading */}
          <h1 className='text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-[#0f172a] mb-4'>
            Shop Smart.<br />Live Better.
          </h1>

          {/* Subtext */}
          <p className='text-sm text-[#64748b] leading-relaxed mb-8'>
            Discover curated products across fashion, lifestyle & more — delivered fast, priced right.
          </p>

          {/* CTA Buttons */}
          <div className='flex items-center gap-4'>
            <button
              onClick={() => navigate('/collection')}
              className='bg-[#0f172a] text-white text-sm font-semibold px-6 py-3 rounded-lg hover:bg-[#1e293b] transition-colors'
            >
              Browse Collection
            </button>
            <button
              onClick={() => navigate('/collection')}
              className='text-sm font-semibold text-[#0f172a] underline underline-offset-4 hover:text-[#3b82f6] transition-colors'
            >
              View Deals →
            </button>
          </div>

          {/* Stats */}
          <div className='flex items-center gap-6 mt-10 pt-6 border-t border-[#e2e8f0]'>
            <div>
              <p className='text-lg font-bold text-[#0f172a]'>5,200+</p>
              <p className='text-xs text-[#94a3b8]'>Products</p>
            </div>
            <div className='w-px h-8 bg-[#e2e8f0]'></div>
            <div>
              <p className='text-lg font-bold text-[#0f172a]'>98%</p>
              <p className='text-xs text-[#94a3b8]'>Happy Customers</p>
            </div>
            <div className='w-px h-8 bg-[#e2e8f0]'></div>
            <div>
              <p className='text-lg font-bold text-[#0f172a]'>Free</p>
              <p className='text-xs text-[#94a3b8]'>Shipping ₹999+</p>
            </div>
          </div>

        </div>
      </div>

      {/* Right Side - Image */}
      <div className='w-full sm:w-1/2 relative overflow-hidden bg-[#f1f5f9]'>
        <img
          className='w-full h-full object-cover object-center'
          src='https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80'
          alt='Shop collection'
        />
        {/* Overlay badge */}
        <div className='absolute top-6 left-6 bg-white rounded-lg px-4 py-2 shadow-md'>
          <p className='text-xs font-semibold text-[#0f172a]'>🔥 Trending Now</p>
        </div>
      </div>
    </div>
  )
}

export default Hero