import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/Shopcontext'
import Title from './Title'
import ProductItem from './ProductItem'

const LatestCollection = () => {
    const [latestproduct, setlatestproduct] = useState([])

    const { products } =useContext(ShopContext)
    useEffect(() =>{
      setlatestproduct(products.slice(0,10))
    },[products])

  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={'LATEST'} text2={'COLLECTION'}/>
        <p className='w-3/4 m-auto text-xs sm:text-sm ms:text-base text-gray-600'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit beatae magnam modi exercitationem. Iure, ducimus.</p>
      </div>

      {/* Rendering Products */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
          latestproduct.map((item,index)=>(
            <ProductItem key={index} id={item._id} image= {item.image} name={item.name} price={item.price} />
          ))
        }
      </div>
    </div>
  )
}

export default LatestCollection