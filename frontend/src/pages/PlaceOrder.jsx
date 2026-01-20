import React, { useContext, useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import assets from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';


const PlaceOrder = () => {
  const [method,setMethod]=useState('cod');
  const {navigate,token,cartItems,setCartItems,getCartAmount,delivery_fee,backendUrl,products}=useContext(ShopContext)
  const[formData,setFormData]=useState({
    firstName:'',
    lastName:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zipcode:'',
    country:'',
    phone:''
  })

  const onChangeHandler=(event)=>{
    const name=event.target.name
    const value=event.target.value

    setFormData(data=>({...data,[name]:value}))
  }

  const onSubmitHandler=async(e)=>{
    e.preventDefault()
    try{
      let orderItems=[]
      for(const items in cartItems){
        for(const item in cartItems[items]){
          if(cartItems[items][item]>0){
            const itemInfo=structuredClone(products.find(product=>product._id===items));
            if(itemInfo){
              itemInfo.size=item
              itemInfo.quantity=cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }
      let orderData={
        address:formData,
        items:orderItems,
        amount:getCartAmount()+delivery_fee
      }

      switch(method){
        case "cod":
          const response=await axios.post(backendUrl+'/api/order/place',orderData,{headers:{token}})
          
          if(response.data.success){
            setCartItems({})
            navigate('/orders')
          }
          else{
            toast.error(response.data.message)
          }
          break
      }
    }

    
    catch(err){
      console.log(err.message)
      toast.error(err.message)

    }

  }
  
  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      
      {/* ------------ Left Side: Delivery Information ---------------- */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>

        <div className='flex gap-3'>
          <input type='text' required  placeholder='First Name'onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input type='text'required  placeholder='Last Name'onChange={onChangeHandler} name='lastName' value={formData.lastName}  className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>

        <input type='email'required  placeholder='Email address' onChange={onChangeHandler} name='email' value={formData.email}  className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        <input type='text' required placeholder='Street' onChange={onChangeHandler} name='street' value={formData.street}  className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />

        <div className='flex gap-3'>
          <input type='text' required  placeholder='City' onChange={onChangeHandler} name='city' value={formData.city}  className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input type='text' required  placeholder='State' onChange={onChangeHandler} name='state' value={formData.state}  className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>

        <div className='flex gap-3'>
          <input type='text'required  placeholder='Zip Code' onChange={onChangeHandler} name='zipcode' value={formData.zipcode}  className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input type='text'required  placeholder='Country' onChange={onChangeHandler} name='country' value={formData.country}  className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>

        <input type='number'required onChange={onChangeHandler} name='phone' value={formData.phone}  placeholder='Phone' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
      </div>

      {/* ------------ Right Side: Cart & Payment ---------------- */}
      <div className='w-full sm:w-auto mt-8 sm:mt-0'>
        {/* Cart Total */}
        <div className='min-w-[280px]'>
          <CartTotal />
        </div>

        {/* Payment Method */}
        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />

          <div onClick={()=>{setMethod('stripe')}} className={`flex flex-col lg:flex-row gap-3 mt-4 `}>
            {/* Stripe */}
            <div className='flex items-center gap-3 border p-2 px-3 rounded cursor-pointer  '>
              <p className={`w-4 h-4 border rounded-full  ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img src={assets.stripe_logo} className='h-5' alt="Stripe" />
            </div>

            {/* Razorpay */}
            <div onClick={()=>{setMethod('razorpay')}} className={`flex items-center gap-3 border p-2 px-3 rounded cursor-pointer`}>
              <p className={`w-4 h-4 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
              <img src={assets.razorpay_logo} className='h-5' alt="Razorpay" />
            </div>

            {/* Cash on Delivery */}
            <div onClick={()=>{setMethod('cod')}} className={`flex items-center gap-3 border p-2 px-3 rounded cursor-pointer hover:shadow-md transition `}>
              <p className={`w-4 h-4 border rounded-full  ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium'>CASH ON DELIVERY</p>
            </div>
          </div>
          <div className='w-full text-end mt-8'>
            <button type='submit' className='bg-black text-white py-3 px-16 text-sm'>Place Order</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;

