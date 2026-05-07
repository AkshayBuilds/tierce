import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/Shopcontext'
import { assets } from '../assets/frontend_assets/assets'
import { useLocation, useNavigate } from 'react-router-dom'

const SearchBar = () => {


    const {search, setsearch, showSearch, setshowSearch} = useContext(ShopContext)
    const location = useLocation()
    const [visible, setvisible] = useState(false)

    useEffect(() => {
        if(location.pathname.includes('collection')){
            setvisible(true)
        }
        else{
            setvisible(false)
        }
    },[location])

  return showSearch && visible ? (
    <div className='border-t border-[#e5e1db] bg-[#fafaf8] text-center'>
        <div className='inline-flex items-center justify-center border border-[#e5e1db] px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2 bg-white shadow-sm'>
        <input value={search} onChange={(e) => setsearch(e.target.value)} type="text" placeholder='Search products...' className='flex-1 outline-none bg-inherit text-sm' />
        <img className='w-4 me-2 opacity-50' src={assets.search_icon} alt="Search" />
        </div>
        <img onClick={() => setshowSearch(false)} src={assets.cross_icon} className='w-3 inline cursor-pointer opacity-50 hover:opacity-100 transition-opacity' alt="Close" />
    </div>
  ) : null
}

export default SearchBar