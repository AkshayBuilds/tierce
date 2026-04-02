import express from 'express'
import { placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,userOrders,updateOrderStatus,verifyStripePayment, verifyRazorpayPayment  } from '../Controllers/orderController.js'
import authUser from '../Middleware/auth.js'
import adminAuth from '../Middleware/adminAuth.js'

const orderRouter = express.Router()


// admin
orderRouter.post('/list',adminAuth ,allOrders)
orderRouter.post('/status', adminAuth, updateOrderStatus)

// Payment methods

orderRouter.post('/place', authUser, placeOrder)
orderRouter.post('/stripe', authUser, placeOrderStripe)
orderRouter.post('/razorpay', authUser, placeOrderRazorpay)

// userOrders
orderRouter.post('/userorders', authUser, userOrders)

// verify stripe payment
orderRouter.post('/verify-stripe',authUser, verifyStripePayment)
orderRouter.post('/verify-razorpay',authUser, verifyRazorpayPayment)

export default orderRouter