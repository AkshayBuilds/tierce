import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/Shopcontext'
import Title from './Title'
import ProductItem from './ProductItem'

const LatestCollection = () => {
    const [latestproduct, setlatestproduct] = useState([])
    const { products } = useContext(ShopContext)

    useEffect(() => {
        setlatestproduct(products.slice(0, 10))
    }, [products])

    return (
        <div className='my-14'>

            {/* Section Header */}
            <div className='text-center py-8'>
                <div className='flex items-center justify-center gap-4 mb-3'>
                    <div className='w-10 h-px bg-[#3b82f6]'></div>
                    <p className='text-xs font-semibold tracking-[0.2em] uppercase text-[#3b82f6]'>Fresh Arrivals</p>
                    <div className='w-10 h-px bg-[#3b82f6]'></div>
                </div>

                <p className='w-2/4 m-auto text-sm text-[#64748b] mt-2 leading-relaxed'>
                    Hand-picked products across top categories — quality you can trust, prices you'll love.
                </p>
            </div>

            {/* Product Grid */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-8'>
                {latestproduct.map((item, index) => (
                    <ProductItem
                        key={index}
                        id={item._id}
                        image={item.image}
                        name={item.name}
                        price={item.price}
                    />
                ))}
            </div>

            {/* View All Button */}
            <div className='text-center mt-10'>
                <button
                    onClick={() => window.location.href = '/collection'}
                    className='border border-[#0f172a] text-[#0f172a] text-sm font-semibold px-8 py-3 rounded-lg hover:bg-[#0f172a] hover:text-white transition-all duration-200'
                >
                    View All Products →
                </button>
            </div>

        </div>
    )
}

export default LatestCollection