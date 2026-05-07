import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/Shopcontext'
import { assets } from '../assets/frontend_assets/assets'
import Title from '../components/Title'
import RelatedProducts from '../components/RelatedProducts'

const Product = () => {
  const { productId } = useParams()
  const { products, currancy, addtoCart } = useContext(ShopContext)
  const [productData, setproductData] = useState(false)
  const [image, setimage] = useState('')
  const [size, setsize] = useState('')

  const featchProductData = async () => {
    products.map((item) => {
      if (item._id == productId) {
        setproductData(item)
        setimage(item.image[0])
        return
      }
    })
  }

  useEffect(() => {
    featchProductData()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [productId, products])

  return productData ? (
    <div className='border-t border-[#e2e8f0] pt-10 transition-opacity ease-in duration-500 opacity-100'>

      {/* Breadcrumb */}
      <p className='text-xs text-[#94a3b8] mb-6'>
        Home / Collection / <span className='text-[#0f172a] font-medium'>{productData.name}</span>
      </p>

      {/* Top Section */}
      <div className='flex gap-12 flex-col sm:flex-row'>

        {/* Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {productData.image.map((item, index) => (
              <img
                onClick={() => setimage(item)}
                src={item}
                key={index}
                className={`w-[24%] sm:w-full sm:mb-3 shrink-0 cursor-pointer rounded-lg border-2 transition-all object-cover
                  ${image === item ? 'border-[#3b82f6]' : 'border-transparent hover:border-[#cbd5e1]'}`}
                alt=""
              />
            ))}
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto rounded-xl object-cover' src={image} alt={productData.name} />
          </div>
        </div>

        {/* Product Info */}
        <div className='flex-1'>

          {/* Name + Badge */}
          <div className='flex items-start justify-between gap-4'>
            <h1 className='font-bold text-2xl text-[#0f172a] leading-snug'>{productData.name}</h1>
            <span className='shrink-0 bg-[#eff6ff] text-[#3b82f6] text-xs font-semibold px-3 py-1 rounded-full'>In Stock</span>
          </div>

          {/* Rating */}
          <div className='flex items-center gap-1 mt-3'>
            {[...Array(4)].map((_, i) => (
              <img key={i} src={assets.star_icon} alt="" className="w-3.5" />
            ))}
            <img src={assets.star_dull_icon} alt="" className="w-3.5" />
            <p className='pl-2 text-sm text-[#94a3b8]'>4.0 <span className='text-[#cbd5e1]'>|</span> 122 reviews</p>
          </div>

          {/* Price */}
          <div className='flex items-baseline gap-3 mt-5'>
            <p className='text-3xl font-bold text-[#0f172a]'>{currancy}{productData.price}</p>
            <p className='text-sm text-[#94a3b8] line-through'>{currancy}{Math.round(productData.price * 1.2)}</p>
            <span className='text-xs font-semibold text-[#16a34a] bg-[#f0fdf4] px-2 py-0.5 rounded-full'>17% OFF</span>
          </div>

          {/* Description */}
          <p className='mt-4 text-sm text-[#64748b] leading-relaxed w-4/5'>{productData.description}</p>

          {/* Divider */}
          <hr className='my-6 border-[#e2e8f0]' />

          {/* Size Selector */}
          <div className='flex flex-col gap-3'>
            <div className='flex items-center justify-between w-4/5'>
              <p className='text-sm font-semibold text-[#0f172a]'>Select Size</p>
              <p className='text-xs text-[#3b82f6] cursor-pointer hover:underline'>Size Guide</p>
            </div>
            <div className='flex gap-2 flex-wrap'>
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setsize(item)}
                  key={index}
                  className={`py-2 px-4 rounded-lg text-sm font-medium border transition-all
                    ${item === size
                      ? 'border-[#3b82f6] bg-[#eff6ff] text-[#3b82f6]'
                      : 'border-[#e2e8f0] bg-white text-[#0f172a] hover:border-[#94a3b8]'
                    }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className='flex items-center gap-3 mt-8'>
            <button
              onClick={() => addtoCart(productData._id, size)}
              className='flex-1 bg-[#0f172a] hover:bg-[#1e293b] text-white py-3 px-6 rounded-lg text-sm font-semibold tracking-wide active:scale-95 transition-all'
            >
              ADD TO CART
            </button>
            <button className='border border-[#e2e8f0] p-3 rounded-lg hover:border-[#3b82f6] hover:text-[#3b82f6] transition-all'>
              <svg xmlns="http://www.w3.org/2000/svg" className='w-5 h-5' fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>

          {/* Trust Badges */}
          <div className='grid grid-cols-3 gap-3 mt-6'>
            {[
              { icon: '✓', text: '100% Original' },
              { icon: '🚚', text: 'Free Delivery ₹999+' },
              { icon: '↩', text: '7-Day Returns' },
            ].map((badge, i) => (
              <div key={i} className='flex flex-col items-center text-center border border-[#e2e8f0] rounded-lg py-3 px-2 bg-[#f8fafc]'>
                <span className='text-lg mb-1'>{badge.icon}</span>
                <p className='text-xs text-[#64748b] font-medium'>{badge.text}</p>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Description & Reviews Tab */}
      <div className='mt-20'>
        <div className='flex'>
          <button className='border-t border-l border-b border-[#e2e8f0] px-6 py-3 text-sm font-semibold text-[#0f172a] bg-white rounded-tl-lg'>
            Description
          </button>
          <button className='border border-[#e2e8f0] px-6 py-3 text-sm text-[#94a3b8] hover:text-[#0f172a] transition-colors'>
            Reviews (122)
          </button>
        </div>
        <div className='border border-[#e2e8f0] rounded-b-lg rounded-tr-lg px-6 py-6 bg-white'>
          <p className='text-sm text-[#64748b] leading-relaxed mb-3'>
            This product is sourced from verified suppliers and goes through strict quality checks before dispatch. Built for everyday use with premium materials that last.
          </p>
          <p className='text-sm text-[#64748b] leading-relaxed'>
            Each item is individually packed and inspected. Product dimensions, materials, and care instructions are listed above. For any queries, reach out to our support team within 24 hours.
          </p>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />

    </div>
  ) : <div className='opacity-0'></div>
}

export default Product