import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { backend_URL, currancy } from '../App'
import { useState } from 'react'
import { toast } from 'react-toastify'
import assets from '../assets/assets'

const Orders = ({token}) => {
  const [orders, setorders] = useState([])

  const featchAllOrders = async() =>{
    if(!token){
      return null
    }

    try {
      const response = await axios.post(backend_URL + '/order/list', {}, {headers: {token}})
      
      if(response.data.success){
        console.log(response.data.orders)
        setorders(response.data.orders.reverse())
      }else{
        toast.error(response.data.message)
      }

    } catch (error) {
      
    }

  }

  const statusHandler = async(e, orderId) =>{
    try {
    
      const response = await axios.post(backend_URL + '/order/status', {orderId, status: e.target.value}, 
      {headers: {token}})

      if(response.data.success){
        await featchAllOrders()
      }else{
        toast.error(response.data.message)
      }

    } catch (error) {
      
    }
  }

  useEffect(() => {
    featchAllOrders()
  }, [token])

  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {
          orders.map((order, index) => (
            <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700' key={index}>
              <img className="w-12" src={assets.parcel_icon}  alt="" />
              <div>
              <div>
                {order.items.map((item, index)=>{
                  if(index === order.items.length -1 ){
                    return <p className='py-0.5'  key={index}> {item.name} X {item.quantity} <span>{item.size}</span></p>
                  }
                  else{
                    return <p  className='py-0.5' key={index}> {item.name} X {item.quantity} <span>{item.size},</span></p>
                  }
                })}
              </div>
              <p className='mt-3 mb-2 font-medium'>{order.address.firstName+""+order.address.lastName}</p>
              <div>
                <p>{order.address.address+","}</p>
                <p>{order.address.city+","+order.address.state+ "," +order.address.country+","+order.address.zipCode}</p>
                </div>
                <p>{order.address.phone}</p>
            </div>
            <div>
              <p className='text-sm sm:text-base'>Items: {order.items.length}</p>
              <p className='mt-3'>Method: {order.paymentMethod}</p>
              <p>Payment: {order.payment ? 'Done' : 'Pending' }</p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p className='text-sm sm:text-base'>{currancy}{order.amount}</p>
            <select onChange={(e)=> statusHandler(e,order._id)} value={order.status} className='p-2 font-semibold'>
              <option value="Order Placed">Order Placed</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders