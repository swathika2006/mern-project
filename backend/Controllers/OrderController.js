// placing orders using cod method
import orderModel from "../Models/OrderModel.js";
import usermodel from "../Models/userModel.js";

const placeOrder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;

    const orderData = {
      userId: req.userId,      // ✅ FIX 1: from middleware
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // ✅ FIX 2: use req.userId
    await usermodel.findByIdAndUpdate(req.userId, {
      cartData: {},
    });

    res.json({
      success: true,
      message: "Order Placed",
    });
  } catch (err) {
    console.log(err.message);

    // ✅ FIX 3: correct error response
    res.json({
      success: false,
      message: err.message,
    });
  }
};


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

