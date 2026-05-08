// add products to user cart

import userModel from "../Models/userModel.js"

const addToCart = async(req,res) =>{
    try {
        const {userId, itemId, size} = req.body

        const user = await userModel.findById(userId)

        let cartData = await user.cartData

        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1
            }
            else{
                cartData[itemId][size] = 1
            }
        }else{
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }

        await userModel.findByIdAndUpdate(userId, {cartData})

        res.json({
            success: true,
            message: "Added to cart"
        })

    } catch (error) {
        res.json({
             success: false,
            message: error.messgae
        })
    }
}
// update user cart

const updateCart = async(req,res) =>{
    try {
        const { userId, itemId, size, quantity} = req.body

        const user = await userModel.findById(userId)
        let cartData = await user.cartData

        if (quantity <= 0) {
            if (cartData[itemId]) {
                delete cartData[itemId][size]
                if (Object.keys(cartData[itemId]).length === 0) {
                    delete cartData[itemId]
                }
            }
        } else {
            if (!cartData[itemId]) {
                cartData[itemId] = {}
            }
            cartData[itemId][size] = quantity
        }

        await userModel.findByIdAndUpdate(userId, {cartData})

        res.json({
            success: true,
            message: "Cart Updated"
        })

    } catch (error) {
         res.json({
            success: false,
            message: error.messgae
        })
    }
}
// get user cart data

const getUserCart = async(req,res) =>{
    try {
        const { userId } = req.body
        const user = await userModel.findById(userId)
        let cartData = await user.cartData

        res.json({
            success:true,
            user,
            cartData
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export{ addToCart, updateCart, getUserCart }
