import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/Shopcontext'
import Title from './Title'
import ProductItem from './ProductItem'

const Bestseller = () => {
    const { products, loadingProducts } = useContext(ShopContext)
    const [bestseller, setbestSeller] = useState([])

    useEffect(() => {
        const bestProduct = products.filter((item) =>(item.bestseller) )

        setbestSeller(bestProduct.slice(0,5))
    },[products])

  return (
    <div className='my-10'>
        <div className='text-center text-3xl py-8'>
            <Title text1={'BEST'} text2={'SELLERS'} />
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-400'>
            Our most loved products, rated and recommended by thousands of happy customers.</p>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {loadingProducts ? (
                [...Array(5)].map((_, index) => (
                    <div key={index} className='animate-pulse rounded-lg bg-white p-3 border border-[#e2e8f0]'>
                        <div className='h-40 rounded-xl bg-[#e2e8f0]' />
                        <div className='mt-3 h-4 rounded bg-[#e2e8f0]' />
                        <div className='mt-2 h-4 w-1/2 rounded bg-[#e2e8f0]' />
                    </div>
                ))
            ) : (
                bestseller.map((item,index) => (
                    <ProductItem key = {index} id={item._id} name={item.name} image={item.image} price={item.price} /> 
                ))
            )}
        </div>

    </div>
  )
}

export default Bestseller
