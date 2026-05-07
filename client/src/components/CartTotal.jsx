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
                <p className='text-gray-500'>Subtotal</p>
                <p className='text-[#1a1a2e]'>{currancy} {getCartAmount()}.00</p>
            </div>
            <hr className='border-[#e5e1db]' />
            <div className='flex justify-between'>
                <p className='text-gray-500'>Shipping Fee</p>
                <p className='text-[#1a1a2e]'>{currancy} {deliveryfee}.00</p>
            </div>
            <hr className='border-[#e5e1db]' />
            <div className='flex justify-between'>
                <b className='text-[#1a1a2e]'>Total</b>
                <b className='text-[#e8a87c] text-lg'>{currancy}{getCartAmount() === 0 ? 0 : getCartAmount() + deliveryfee}.00</b>
            </div>
        </div>
    </div>
  )
}

export default CartTotal