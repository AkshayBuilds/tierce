import React, { useState } from 'react'
import assets from '../assets/assets'
import axios from 'axios'
import { backend_URL } from '../App'
import { toast } from 'react-toastify'
const Add = ({token}) => {

  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [name, setname] = useState('')
  const [discription, setdiscription] = useState('')
  const [category, setcategory] = useState('Men')
  const [subCategory, setsubCategory] = useState('Topwear')
  const [price, setprice] = useState('')
  const [sizes, setsizes] = useState([])
  const [bestseller, setbestSeller] = useState(false)
  const [loading, setloading] = useState(false)

  const handlesubmit = async (e) => {
    try {
    setloading(true)
    e.preventDefault()
    const formData = new FormData()
    image1 && formData.append('image1', image1)
    image2 && formData.append('image2', image2)
    image3 && formData.append('image3', image3)
    image4 && formData.append('image4', image4)
    formData.append('name', name)
    formData.append('discription', discription)
    formData.append('category', category)
    formData.append('subCategory', subCategory)
    formData.append('price', price)
    formData.append('sizes', JSON.stringify(sizes))
    formData.append('bestseller', bestseller)
    

   const response = await axios.post(`${backend_URL}/product/add`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        token
      }
    })
    if(response.data.success){
      toast.success(response.data.message)
      setImage1(false)
      setImage2(false)
      setImage3(false)
      setImage4(false)
      setname('')
      setdiscription('')
      setcategory('Men')
      setsubCategory('Topwear')
      setprice('')
      setsizes([])
      setbestSeller(false)
    }else{
      toast.error(response.data.message)
    }
    
    setloading(false)
    } catch (error) {
      console.log(error.message)
      toast.error(error.message)
    }
  }
  return (
    <form onSubmit={handlesubmit} className='flex flex-col w-full items-start gap-3'>
      <div>
        <p className='mb-2'>Upload Image</p>
        <div className='flex gap-2 '>
          <label htmlFor="image1">
            <img className='w-20 h-20 overflow-auto' src={ !image1 ? assets.upload_area : URL.createObjectURL(image1) } alt="" />
            <input onChange={(e) => setImage1(e.target.files[0]) } type="file" id='image1' hidden/>
          </label>
          <label htmlFor="image2">
            <img className='w-20' src={ !image2 ? assets.upload_area : URL.createObjectURL(image2) } alt="" />
            <input onChange={(e) => setImage2(e.target.files[0]) } type="file" id='image2' hidden/>
          </label>
          <label htmlFor="image3">
            <img className='w-20' src={ !image3 ? assets.upload_area : URL.createObjectURL(image3)  } alt="" />
            <input onChange={(e) => setImage3(e.target.files[0]) } type="file" id='image3' hidden/>
          </label>
          <label htmlFor="image4">
            <img className='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
            <input onChange={(e) => setImage4(e.target.files[0]) } type="file" id='image4' hidden/>
          </label>
        </div>
      </div>  
      <div className='w-full '>
        <p className='mb-2'>Product Name</p>
        <input onChange={(e) => setname(e.target.value)} value={name} className='w-full max-w-125 px-3 py-2 outiline-none ' type="text" placeholder='Type here...' required/>
      </div>
      <div className='w-full '>
        <p className='mb-2'>Product Discription</p>
        <textarea onChange={(e) => setdiscription(e.target.value)} value={discription} className='w-full max-w-125 px-3 py-2 outiline-none ' type="text" placeholder='Write content here...' required/>
      </div>
      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Product Category</p>
          <select onChange={(e) => setcategory(e.target.value)} value={category} className='w-full max-w-125 px-3 py-2 outiline-none ' required>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Children</option>
          </select>
        </div>
        <div>
          <p className='mb-2'>SubCategory</p>
          <select onChange={(e) => setsubCategory(e.target.value)} value={subCategory} className='w-full max-w-125 px-3 py-2 outiline-none ' required>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        <div>
          <p className='mb-2'>Product Price</p>
          <input onChange={(e) => setprice(e.target.value)} value={price} className='w-full sm:w-30 px-3 py-2 outiline-none ' type="number" placeholder='25' required/>
        </div>
      </div>
      <div>
        <p className='mb-2'>Product Sizes</p>
        <div className='flex gap-3'>
          <div onClick={()=> setsizes(prev=> prev.includes('S') ? prev.filter(item => item !== 'S') : [...prev, 'S'])}>
            <p className={`${sizes.includes('S') ? 'bg-blue-500 text-white' : 'bg-slate-200'} mb-2 px-3 py-1 cursor-pointer transition-colors`}>S</p> 
          </div >
          <div onClick={()=> setsizes(prev=> prev.includes('M') ? prev.filter(item => item !== 'M') : [...prev, 'M'])}>
            <p className={`${sizes.includes('M') ? 'bg-blue-500 text-white' : 'bg-slate-200'} mb-2 px-3 py-1 cursor-pointer transition-colors`}>M</p>
          </div>
          <div onClick={()=> setsizes(prev=> prev.includes('L') ? prev.filter(item => item !== 'L') : [...prev, 'L'])}>
            <p className={`${sizes.includes('L') ? 'bg-blue-500 text-white' : 'bg-slate-200'} mb-2 px-3 py-1 cursor-pointer transition-colors`}>L</p>
          </div>
          <div onClick={()=> setsizes(prev=> prev.includes('XL') ? prev.filter(item => item !== 'XL') : [...prev, 'XL'])}>
            <p className={`${sizes.includes('XL') ? 'bg-blue-500 text-white' : 'bg-slate-200'} mb-2 px-3 py-1 cursor-pointer transition-colors`}>XL</p>
          </div>
          <div onClick={()=> setsizes(prev=> prev.includes('XXL') ? prev.filter(item => item !== 'XXL') : [...prev, 'XXL'])}>
            <p className={`${sizes.includes('XXL') ? 'bg-blue-500 text-white' : 'bg-slate-200'} mb-2 px-3 py-1 cursor-pointer transition-colors`}>XXL</p>
          </div>
        </div>
      </div>
      <div className='flex items-center mt-2 gap-2'>
        <input onChange={()=> setbestSeller(prev => !prev)} checked={bestseller} type="checkbox"  id='bestseller'/>
        <label className='cursor-pointer' htmlFor="bestseller">Add to Best Seller</label>
      </div>
      <button className={`bg-black text-white px-6 py-2 mt-4 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'}`}  type='submit' disabled={loading}>
        {loading ? 'Adding Product...' : 'Add Product'}
      </button>
    </form>
  )
}

export default Add