import React from 'react'

const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center justify-between py-3 px-[4%] bg-white shadow-sm border-b border-gray-100'>
        <h1 className='text-2xl font-bold tracking-tight' style={{fontFamily: "'Playfair Display', serif"}}>TIERCE <span className='text-sm font-normal text-gray-400 tracking-wider'>ADMIN</span></h1>
        <button onClick={()=> setToken('')} className='bg-[#1a1a2e] hover:bg-[#e8a87c] text-white px-5 py-2 sm:px-7 sm:py-2 rounded-lg text-sm cursor-pointer transition-colors' >Logout</button>
    </div>
  )
}

export default Navbar