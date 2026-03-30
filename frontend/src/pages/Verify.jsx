import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
const Verify = () => {
    const {navigate,token,setCartItems,backendUrl}=useContext(ShopContext);
    const [searchParams,setSearchParams]=useSearchParams();

    const success=searchParams.get('success');
    const orderId=searchParams.get('orderId')

    const verifyPayment=async()=>{
        try{
            if(!token){
                return null;
            }
            const response=await axios.post(backendUrl+'/api/order/verifyStripe',{success,orderId},{headers:{token}});
            if(response.data.success){
               setCartItems({});
               navigate('/orders');
            }
            else{
                navigate('/cart');
            }            
        }
        catch(err){
            console.log(err.message);
            toast.error(err.message);
        }
    }

    useEffect(()=>{
        verifyPayment();
    },[token])
  return (
    <div>Verify</div>
  )
}

export default Verify

// DESCRIPTION::
// Actually this is basic method and not the best way to create a secured payment verification method 