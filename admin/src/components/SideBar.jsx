import React from 'react'
import { NavLink } from 'react-router-dom'
import assets from '../assets/assets'

const SideBar = () => {
  return (
    <div className='w-[18%] min-h-screen shadow-md border-r-2 border-gray-200 '>
        <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
            <NavLink className="flex items-center gap-2 border border-gray-300 border-r-0  px-3 rounded-lg py-2 " to="/add">
            <img className='w-5 h-5 ' src={assets.add_icon} alt="" />
            <p className='hidden md:block'>Add Product</p>
            </NavLink>
            <NavLink className="flex items-center gap-2 border border-gray-300 border-r-0  px-3 rounded-lg py-2 " to="/list">

            <img className='w-5 h-5 ' src={assets.order_icon} alt="" />
            <p className='hidden md:block'>List Products</p>
            </NavLink>

            <NavLink className="flex items-center gap-2 border border-gray-300 border-r-0  px-3 rounded-lg py-2 " to="/orders">
            <img className='w-5 h-5 ' src={assets.order_icon} alt="" />
            <p className='hidden md:block'>Orders</p>
            </NavLink>
        </div>
    </div>
  )
}

export default SideBar