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
    <div className='min-h-screen flex items-center justify-center'>
        <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
            <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
            <form onSubmit={handleSubmit}>
                <div className='mb-3 min-w-72'>
                    <p className='text-sm font-medium text-gray-700 mb-2'>E-mail Address</p>
                    <input onChange={(e)=> setemail(e.target.value)} className='rounded-md w-full px-3 py-3 border border-gray-300 outline-none' type="email" placeholder='Your@gmail.com' required />
                </div>
                <div className='mb-3 min-w-72'>
                    <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
                    <input onChange={(e)=> setpassword(e.target.value)} className='rounded-md w-full px-3 py-3 border border-gray-300 outline-none' type="password" placeholder='Your password' required />
                </div>
                <button className='mt-2 w-full text-white bg-black hover:bg-gray-900 transition-all duration-200 hover:text-white font-bold py-2 px-4 rounded active:scale-101 cursor-pointer' type='submit'>Login</button>
            </form>
        </div>
    </div>
  )
}

export default Login