// placing orders using cod method

import orderModel from "../Models/OrderModel.js";
import usermodel from "../Models/userModel.js";

const placeOrder = async(req , res)=>{
    try{
        const {userId,items,amount,address}=req.body;
        const orderData={
            userId,
            items,
            address,
            amount,
            paymentMethod:"COD",
            payment:false,
            date:Date.now()
        }
        const newOrder=new orderModel(orderData)
        await newOrder.save()

        await usermodel.findByIdAndUpdate(userId,{cartData:{}})

        res.json({success:true,message:"Order Placed"})

    }
    catch(err){
        console.log(err.message)
        res.json({success:false},err.message)

    }
}

// placing orders using Stripe method
const placeOrderStripe = async(req , res)=>{

}


// placing orders using RazorPay method
const placeOrderRazorPay = async(req , res)=>{

}

// all the orders data for the admin panel
const allOrders = async (req,res)=>{
    
}


// all the orders data for the admin panel
const userOrders = async (req,res)=>{

}

// update order status from Admin panel
const updateStatus = async (req,res)=>{

}


export {placeOrder,placeOrderStripe,placeOrderRazorPay,allOrders,userOrders,updateStatus}

