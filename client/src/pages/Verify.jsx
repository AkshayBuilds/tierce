import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/Shopcontext'
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Verify = () => {

    const {navigate, token ,setcartItems, backend_URL} = useContext(ShopContext);
    const [searchParams, setsearchParams] = useSearchParams();

    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");

    const verifypayment = async () => {
        try {
            if(!token){
              return null
            }

            const response = await axios.post(backend_URL+'/order/verify-stripe',{success, orderId}, {headers:{token}})

            console.log(response.data)

            if(response.data.success){
              setcartItems([])
              toast.success(response.data.message)
              navigate('/orders')
            }else{
              toast.error(response.data.message)
              navigate('/cart')
            }

        } catch (error) {
            toast.error(error.message)
        }

    }
    useEffect(()=> {
      verifypayment()
    },[token])

  return (
    <div>

    </div>
  )
}

export default Verify