import React from 'react'
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title'


export const CartTotal = () => {
  const {cartItems,currency,getCartAmount, delivery_fee} = useContext(ShopContext);
  return (
    <div className='w-full'>
      <div className='text-2xl'>
        <Title text1={'CART'} text2={'TOTALS'}></Title>
      </div>
      <div className='flex flex-col gap-2 mt-2 text-sm'>
        <div className='flex justify-between'>
          <p>SubTotal</p>
          <p>{currency} {getCartAmount()}.00</p>


        </div>
        <hr></hr>
        <div className='flex justify-between'>
          <p>Shipping Fee</p>
          <p>{currency}{delivery_fee}</p>
        </div>
        <hr></hr>
        <div className='flex justify-between'>
          <b>Total</b>
          <b>{currency}{getCartAmount()===0 ? 0 : getCartAmount()+delivery_fee}</b>
        </div>
      </div>
        
    </div>
  )
}
export default CartTotal
