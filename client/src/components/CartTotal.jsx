import React, { useContext } from 'react'
import { ShopContext } from '../context/Shopcontext'
import Title from './Title'

const CartTotal = () => {
    const { currancy, deliveryfee, getCartAmount } = useContext(ShopContext)

  return (
    <div className='w-full'>
        <div className='text-2xl'>
            <Title text1={'CART'}  text2={'TOTALS'}/>
        </div>
        <div className='flex flex-col gap-2 mt-2 text-sm'>
            <div className='flex justify-between '>
                <p>Subtotal</p>
                <p>{currancy} {getCartAmount()}.00</p>
            </div>
            <hr />
            <div className='flex justify-between'>
                <p>Shipping Fee</p>
                <p>{currancy} {deliveryfee}.00</p>
            </div>
            <hr />
            <div className='flex justify-between'>
                <b>Total</b>
                <b>{currancy}{getCartAmount() === 0 ? 0 : getCartAmount() + deliveryfee}.00</b>
            </div>
        </div>
    </div>
  )
}

export default CartTotal