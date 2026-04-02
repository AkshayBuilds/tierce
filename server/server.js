import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import connect_db from './config/db.js';
import connect_cloudinary from './config/coudinary.js';
import userRouter from './Routes/userRoute.js';
import productRouter from './Routes/productRoute.js';
import cartRouter from './Routes/cartRoute.js';
import orderRouter from './Routes/orderRoute.js';

// app config

const app = express()
const PORT = process.env.PORT || 3000

connect_db()
connect_cloudinary()
// middleware

app.use(express.json())

app.use(cors({
  origin: "https://forever-admin-gray-delta.vercel.app"
}))

// endPoints

app.use('/user', userRouter)
app.use('/product', productRouter)
app.use('/cart', cartRouter)
app.use('/order', orderRouter)

app.get('/', (req,res) => {
    res.send('API WORKING')
} )

app.listen(PORT, ()=> console.log(`Server Running on Port: ${PORT}`))