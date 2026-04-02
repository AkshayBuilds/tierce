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
    <div className='border-t bg-gray-50 text-center'>
        <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
        <input value={search} onChange={(e) => setsearch(e.target.value)} type="text" placeholder='Search' className='flex-1 outline-none bg-inherit text-sm' />
        <img className='w-4 me-2' src={assets.search_icon} alt="" />
        </div>
        <img onClick={() => setshowSearch(false)} src={assets.cross_icon} className='w-3 inline cursor-pointer' alt="" />
    </div>
  ) : null
}

export default SearchBar