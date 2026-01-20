import express from "express"

import {placeOrder,placeOrderStripe,placeOrderRazorPay,allOrders,userOrders,updateStatus} from "../Controllers/OrderController.js"
import adminAuth from "../middleware/adminauth.js"
import authUser from "../middleware/auth.js"
const orderRouter=express.Router()

// admin features
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

// payment features

orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/stripe',authUser,placeOrderStripe)
orderRouter.post('/razorpay',authUser,placeOrderRazorPay)

// user feautures

orderRouter.post('/userorders',authUser,userOrders)


export default orderRouter