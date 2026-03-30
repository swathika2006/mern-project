// placing orders using cod method
import orderModel from "../Models/OrderModel.js";
import usermodel from "../Models/UserModel.js";
import Stripe from 'stripe';
import razorpay from 'razorpay';


// To create a global variable for Delivery and currency
const currency='inr'
const deliveryCharge=10;
const stripe=new Stripe(process.env.STRIPE_SECRET_KEY);

// CONTROLLLER FUNCTION NEED TO BE CREATED ... FOR THE BELOW
const razorpayInstance=new razorpay({
  key_id:process.env.RAZORPAY_KEY_ID,
  key_secret:process.env.RAZORPAY_SECRET_KEY
})

const placeOrder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;

    const orderData = {
      userId: req.userId,      
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await usermodel.findByIdAndUpdate(req.userId, {
      cartData: {},
    });

    res.json({
      success: true,
      message: "Order Placed",
    });
  } catch (err) {
    console.log(err.message);

    res.json({
      success: false,
      message: err.message,
    });
  }
};


// placing orders using Stripe method
const placeOrderStripe = async(req , res)=>{
  try{
    const {userId,items,amount,address}=req.body;
    const {origin}=req.headers;
    const orderData = {
      userId: req.userId,   
      items,
      address,
      amount,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };
    
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items=items.map((item)=>({
      price_data:{
        currency:currency,
        product_data:{
          name:item.name
        },
        unit_amount:item.price*100,
      },
      quantity:item.quantity,
    }))

    line_items.push({
      price_data:{
        currency:currency,
        product_data:{
          name:"Delivery Charges"
        },
        unit_amount:deliveryCharge*100,
      },
      quantity:1
    })
    const session = await stripe.checkout.sessions.create({
      success_url:`${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url:`${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode:`payment`,
    })

    res.json({success:true,session_url:session.url})

    // we get the origin from the request headers
  }catch(err){
    console.log(err.message);
    res.json({success:false,message:err.message})
  }
}

// controller function to check the payment has been done?? verify stripe

const verify_stripe=async(req,res)=>{
  const {orderId,success,userId}=req.body

  try{
    if(success==="true"){
      await orderModel.findByIdAndUpdate(orderId,{payment:true});
      await usermodel.findByIdAndUpdate(userId,{cartData:{}});
      // inga dhan nee payment pannathuku apram cart la irunthu product remove aagum.....
      res.json({success:true});
    }
    else{
      await orderModel.findByIdAndDelete(orderId);
      res.json({success:false});
    }
  }

  catch(err){
    console.log(err.message);
    res.json({success:false,message:err.message});
  }
}


// placing orders using RazorPay method
const placeOrderRazorPay = async(req , res)=>{
    try{
    const {userId,items,amount,address}=req.body;
    const {origin}=req.headers;
    const orderData = {
      userId: req.userId,     
      items,
      address,
      amount,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const options ={
      amount : amount*100,
      currency:currency.toUpperCase(),
      receipt:newOrder._id.toString()
    }
    await razorpayInstance.orders.create(options,(error,order)=>{
      if(error){
        console.log(error.message);
        return res.json({success:false,message:error});
      }
      res.json({success:true,order})
    })
  }
  catch(err){
    console.log(err.message)
    res.json({success:false,message:err.message});
  }
}

const verifyRazorpay=async(req,res)=>{
  try{
    const {userId,razorpay_order_id}=req.body
    const orderInfo=await razorpayInstance.orders.fetch(razorpay_order_id);
    // console.log(orderInfo)
    if(orderInfo.status==='paid'){
      await orderModel.findByIdAndUpdate(orderInfo.receipt,{payment:true});
      await usermodel.findByIdAndUpdate(userId,{cartDate:{}})
      res.json({success:true,message:"Payment Successfull"});
    }
    else{
      res.json({success:false,message:"Payment failed"})
    }

  }
  catch(err){
    console.log(err.message);
    res.json({success:false,message:err.message})
  }
}

// all the orders data for the admin panel
const allOrders = async (req,res)=>{
    try{
      const orders=await orderModel.find({})
      res.json({success:true,orders})

    }
    catch(err){
      console.log(err.message)
      res.json({success:false,message:err.message})
    }
}



const userOrders = async (req, res) => {
  try {
    const userId = req.userId; 

    const orders = await orderModel.find({ userId });

    res.json({
      success: true,
      orders,
    });

  } catch (err) {
    console.log(err.message);
    res.json({
      success: false,
      message: err.message,
    });
  }
};


// update order status from Admin panel
const updateStatus = async (req,res)=>{


  try{
    const {orderId,status}=req.body
    await orderModel.findByIdAndUpdate(orderId,{status})
    res.json({success:true.valueOf,message:"Order updated successfully"})
  }
  catch(err){
    console.log(err)
     res.json({
      success: false,
      message: err.message,
    });
  }

}


export {verify_stripe,verifyRazorpay,placeOrder,placeOrderStripe,placeOrderRazorPay,allOrders,userOrders,updateStatus}
