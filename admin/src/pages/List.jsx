import React, { useEffect, useState } from 'react'
import { backendURL, currency } from '../App'
import  axios  from 'axios'
import { toast } from 'react-toastify'
const List = ({token}) => {

  const[list,setList]=useState([])
  

  const fetchList=async()=>{
    try{
      const response=await axios.get(backendURL+'/api/product/list')
      if(response.data.success){
      setList(response.data.products)
      }
      else{
        toast.error(response.data.message)
      }
    }
    catch(err){
      console.log(err.message)
      toast.error(err.message)
    }

  }


  const RemoveProduct=async(id)=>{
    try{
      const response=await axios.post(backendURL+'/api/product/remove',{id},{headers:{token}})
      if(response.data.success){

        toast.success(response.data.message)
        await fetchList();

      }
      else{
        toast.error(response.data.message)
      }

    }
    catch(err){
      console.log(err);
      toast.error(err.message)
    }
  }

  useEffect(()=>{
    fetchList()
  },[])




  return (
   <>
   <p className='mb-2'>All Products List</p>
   <div className="flex flex-col gap-2 ">

    {/* List Table title */}

    <div className="md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 bg-gray-100 text-sm">
      <b>Image</b>
      <b>Name</b>
      <b>Category</b>
      <b>Price</b>
      <b className='text-center'>Action</b>
    </div>

    {/* PRODUCT LIST  */}
    {
      list.map((item,index)=>
        <div className='grid gird-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 gap-2 text-sm' key={index}>
          <img src={item.image[0]} alt="" className='w-12'/>
          <p>{item.name}</p>
          <p>{item.category}</p>
          <p>{currency}{item.price}</p>
          <p onClick={()=>{RemoveProduct(item._id)}} className='text-right cursor-pointer md:text-center text-lg'>X</p>
        </div>
      )
    }
   </div>
   </>
  )
}

export default List