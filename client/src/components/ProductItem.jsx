import React, { useContext } from 'react'
import { ShopContext } from '../context/Shopcontext'
import { Link } from 'react-router-dom'

const ProductItem = ({id, image,name, price}) => {
    const { currancy } = useContext(ShopContext)
  return (
    <Link className='text-gray-700 cursor-pointer group' to={`/product/${id}`}>

        <div className='overflow-hidden rounded-lg bg-white shadow-sm'>
            <img src={image[0]} className='group-hover:scale-105 transition-transform duration-500 ease-out w-full' alt={name} />
        </div>
        <p className='pt-3 pb-1 text-sm text-[#1a1a2e]'>{name}</p>
        <p className='text-sm font-semibold text-[#e8a87c]'>{currancy}{price}</p>
    </Link>
  )
}

export default ProductItem