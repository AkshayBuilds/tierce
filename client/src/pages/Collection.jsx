import React, { useContext, useEffect, useState } from 'react'
import {ShopContext} from '../context/Shopcontext'
import { assets } from '../assets/frontend_assets/assets'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'
const Collection = () => {

  const { products, search, showSearch } = useContext(ShopContext)
  const [showFilter, setshowFilter] = useState(true)
  const [filterProducts, setfilterProducts] = useState([])
  const [category, setcategory] = useState([])
  const [subCategory, setsubCategory] = useState([])
  const [sortType, setsortType] = useState('relavant')

  const toggleCategory = (e) => {
    if(category.includes(e.target.value)){
      setcategory(prev=> prev.filter(item => item !== e.target.value))
    }
    else{
      setcategory(prev=> [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e) =>{
    if(subCategory.includes(e.target.value)){
      setsubCategory(prev=> prev.filter(item => item !== e.target.value))
    }
    else{
      setsubCategory(prev=> [...prev, e.target.value])
    }
  }

  const applyFilter = () => {

    let productsCopy = products.slice(); 
    if(showSearch && search){
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()) )
    }

    if(category.length > 0){
      productsCopy = productsCopy.filter(item => category.includes(item.category))
    }
    if(subCategory.length > 0){
      productsCopy = productsCopy.filter(item=> subCategory.includes(item.subCategory))   
    }
    setfilterProducts(productsCopy)
  }

  const sortProduct = () => {
    let fpCopy = filterProducts.slice()
    switch(sortType){
      case 'lowhigh':
        setfilterProducts(fpCopy.sort((a,b) => (a.price - b.price)))
        break;

      case 'highlow':
        setfilterProducts(fpCopy.sort((a,b) => (b.price - a.price)))
        break;

      default:
        applyFilter()
        break
    }
  }

  useEffect(() => {
    applyFilter()
  },[category, subCategory, search, showSearch,products])

  useEffect(() => {
    sortProduct()
  },[sortType])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Filter Options */}
      <div className='min-w-60'>
        <p onClick={() => (setshowFilter(!showFilter))} className='my-2 text-xl flex items-center gap-2 cursor-pointer'>FILTERS
          <img className={`h-3 sm:hidden ${showFilter? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>
        {/* Category Filter */}
        <div className={`border border-gray-300 transition-all pl-5 py-3 mt-6 ${showFilter ? '': 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3'  value={'Men'} onChange ={toggleCategory}/>Men
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3'  value={'Women'} onChange ={toggleCategory}/>Women
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3'  value={'Kids'} onChange ={toggleCategory}/>Kids
            </p>
          </div>
        </div>
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '': 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3'  value={'Topwear'} onChange={toggleSubCategory}/>Topwear
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3'  value={'Bottomwear'} onChange={toggleSubCategory}/>Bottomwear
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3'  value={'Winterwear'} onChange={toggleSubCategory}/>Winterwear
            </p>
          </div>
        </div>
      </div>
      {/* Right Side */}
      <div className='flex-1 '>
        <div className='flex justify-between test-base sm:text-2xl mb-4'>

          <Title text1={'ALL'} text2={'COLLECTIONS'}/>
          {/* Product sort */}

          <select onChange={(e) => setsortType(e.target.value)} className='border-2 border-gray-300 px-2 text-sm'>
            <option value="relavant">Sort by: Relavant</option>
            <option value="lowhigh">Sort by: Low to High</option>
            <option value="highlow">Sort by: High to Low</option>
          </select>
        </div>
        {/* Map Products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProducts.map((item,index) => (
              <ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.image} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Collection