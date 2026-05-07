import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import connect_db from './config/db.js';
import connect_cloudinary from './config/coudinary.js';
import userRouter from './Routes/userRoute.js';
import productRouter from './Routes/productRoute.js';
import cartRouter from './Routes/cartRoute.js';

// app config

const app = express()
const PORT = process.env.PORT || 3000

connect_db()
connect_cloudinary()
// middleware

app.use(express.json())

app.use(cors({
  origin: [
    "https://tierce-ecom.vercel.app",
    "https://tierce-admin.vercel.app"
  ],
  credentials: true,
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization,token"
}));
// endPoints

app.use('/user', userRouter)
app.use('/product', productRouter)
app.use('/cart', cartRouter)

app.get('/', (req, res) => {
  res.send('API WORKING')
})

app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`))
