import orderModel from "../Models/orderModel.js";
import userModel from "../Models/userModel.js";
import Stripe from "stripe";
import razorpay from 'razorpay'
import crypto from "crypto";
// Globle variables
const currency = 'inr';
const deliveryCharges = 10;
// gateway for placing order
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const razorPayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
})

// Placing order using cod
const placeOrder = async (req, res) => {
  try {

    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);

    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, {cartData: {}});

    res.json({
        success: true,
        message: "Order Placed Successfully"
    })

  } catch (error) {
    res.json({
        success: false,
        message: error.message
    })
  }
};
// Placing order using Stripe

const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address, token } = req.body;
    const { origin } = req.headers;

     const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };
    
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data:{
        currency: currency,
        product_data:{
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }))

    line_items.push({
      price_data:{
        currency: currency,
        product_data:{
          name: "Shipping Charges",
        },
        unit_amount: deliveryCharges  * 100,
      },
      quantity: 1,
    })

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      mode: "payment",
      line_items,
    })

    res.json({
      success: true,
      url: session.url
    })

  } catch (error) {
    console.log(error.message)
    res.json({
      success: false,
      message: error.message
    })
  }
};
// Placing order by Razorpay

const placeOrderRazorpay = async (req, res) => {

  try {

    const { userId, items, amount, address, token } = req.body;

     const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const options = {
      amount: amount * 100,
      currency: currency.toUpperCase(),
      receipt: newOrder._id.toString()
    }

    await razorPayInstance.orders.create(options, (err, order) => {
      if(err){
        console.log(err)
        return res.json({
          success: false,
          message: err.message
        })
      }


      res.json({
        success: true,
        order
      })
    })

  } catch (error) {
    res.json({
        success: false,
        messgae: error.message
      })
  }

};
// Get user orders

const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({})

    res.json({
      success: true,
      orders
    })

  } catch (error) {
    res.json({
      success: false,
      message: error.message
    })
  }
};
// user frontend data

const userOrders = async (req, res) => {
  try {
    const { userId } = req.body

    const orders = await orderModel.find({userId})

    res.json({
        success: true,
        orders
    })
  } catch (error) {
    console.log(error)
    res.json({
        success: false,
        message: error.message
    })
  }
};
// Update order status by admin
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body

    await orderModel.findByIdAndUpdate(orderId, { status })

    res.json({
      success: true,
      message: "Order status updated successfully"
    })

  } catch (error) {
    res.json({
      success: false,
      message: error.message
    })
  }
};

const verifyStripePayment = async (req, res) => {
  try {
    const { orderId, success } = req.body;

    // 🧠 Validate input
    if (!orderId) {
      return res.json({
        success: false,
        message: "OrderId missing"
      });
    }

    // 🔍 Find order
    const order = await orderModel.findById(orderId);

    if (!order) {
      return res.json({
        success: false,
        message: "Order not found"
      });
    }

    // ✅ Payment success
    if (success === "true") {
      // Update order payment status
      await orderModel.findByIdAndUpdate(orderId, {
        payment: true
      });

      // Clear user's cart
      await userModel.findByIdAndUpdate(order.userId, {
        cartData: {}
      });

      return res.json({
        success: true,
        message: "Payment verified successfully"
      });
    }

    // ❌ Payment failed
    else {
      await orderModel.findByIdAndDelete(orderId);

      return res.json({
        success: false,
        message: "Payment failed, order removed"
      });
    }

  } catch (error) {
    console.error(error);

    return res.json({
      success: false,
      message: error.message
    });
  }
};


const verifyRazorpayPayment = async (req, res) => {
  try {
    const { razorpay_order_id, userId } = req.body;
    console.log(userId)

    const orderInfo = await razorPayInstance.orders.fetch(razorpay_order_id);

    if(orderInfo.status === 'paid'){
      await orderModel.findByIdAndUpdate(orderInfo.receipt, {
        payment: true
      });
      
      await userModel.findByIdAndUpdate(userId, {
        cartData: {}
      });
      res.json({
        success: true,
        message: "Payment verified successfully"
      })  
    }

    else{
      res.json({
        success: false,
        message: "Payment verification failed"
      })
    }

  } catch (error) {
    console.error(error);

    return res.json({
      success: false,
      message: error.message
    });
  }
};

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateOrderStatus,
  verifyStripePayment,
  verifyRazorpayPayment
};
