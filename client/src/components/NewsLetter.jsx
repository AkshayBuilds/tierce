import React, { useState } from 'react'
import { toast } from 'react-toastify';

const NewsLetter = () => {
    const [email, setemail] = useState('')
    const onSubmitHandler = (e) =>{
        e.preventDefault();
        toast.success("Email subscribed successfully!")
        setemail('')
    }
  return (
    <div className='text-center '>
        <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
        <p className='text-gray-400 mt-3 '>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia, dolorem.
        </p>
        <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-centergap-3 mx-auto my-6 border pl-3'>
            <input type="email" placeholder='Enter your email' className='sm:flex w-full outline-none
            '
            value={email}
            onChange={(e) => setemail(e.target.value)}
             required/>
            <button type='submit' className='bg-black text-white text-xs px-10 py-4 cursor-pointer'>Subscribe</button>
        </form>
    </div>
  )
}

export default NewsLetter