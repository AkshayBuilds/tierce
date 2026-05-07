import React, { useState } from 'react'
import { backend_URL } from '../App'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = ({setToken}) => {

    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    const handleSubmit = async(e) => {
        try {
            e.preventDefault()
            const response = await axios.post(backend_URL+'/user/admin', { email, password })

            if(response.data.success){
                setToken(response.data.token)
                toast.success("Login Successfully")
            }else{
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        }
    }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
        <div className='bg-white shadow-lg rounded-xl px-8 py-8 max-w-md'>
            <h1 className='text-2xl font-bold mb-1 text-[#1a1a2e]' style={{fontFamily: "'Playfair Display', serif"}}>TIERCE</h1>
            <p className='text-gray-400 text-sm mb-6'>Admin Panel Login</p>
            <form onSubmit={handleSubmit}>
                <div className='mb-3 min-w-72'>
                    <p className='text-sm font-medium text-gray-700 mb-2'>E-mail Address</p>
                    <input onChange={(e)=> setemail(e.target.value)} className='rounded-lg w-full px-4 py-3 border border-gray-200 outline-none focus:border-[#e8a87c] transition-colors text-sm' type="email" placeholder='admin@tierce.in' required />
                </div>
                <div className='mb-3 min-w-72'>
                    <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
                    <input onChange={(e)=> setpassword(e.target.value)} className='rounded-lg w-full px-4 py-3 border border-gray-200 outline-none focus:border-[#e8a87c] transition-colors text-sm' type="password" placeholder='Enter password' required />
                </div>
                <button className='mt-2 w-full text-white bg-[#1a1a2e] hover:bg-[#e8a87c] transition-all duration-300 font-medium py-3 px-4 rounded-lg active:scale-95 cursor-pointer tracking-wider text-sm' type='submit'>LOGIN</button>
            </form>
        </div>
    </div>
  )
}

export default Login