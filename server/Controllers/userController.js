import userModel from "../Models/userModel.js"
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const generateToken = (id) =>{
    return jwt.sign({
        id},
        process.env.JWT_SECRET
    )
}
// routre for userLogin
const loginUser = async(req,res) =>{
    try {
        const {email, password} = req.body

        const user = await userModel.findOne({email})

        if(!user){
            return res.json({
                success:false,
                message:"Invalid email or password"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.json({
                message:"Invalid email or password",
                success: false
            })
        }

        const token = generateToken(user._id)

        res.cookie('token', token)

        res.json({
            message:"Login Successfully",
            success: true,
            token
        })
        

    } catch (error) {
        console.log(error.message)
        res.json({
            message: error.message,
            success: false
        })
    }
}
// routre for register
const registerUser = async(req,res) =>{
    try {
        const { name, email, password } = req.body

        const alreadyUser = await userModel.findOne({email})
        if(alreadyUser){
            return res.send({
                message: "User Already Exists",
                success: false
            })
        }
        if(!validator.isEmail(email)){
            return res.send({
                message: "Please Enter a valid Email",
                success: false
            })
        }
        if(password.length < 8){
            return res.send({
                message: "Please enter a strong password",
                success: false
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await userModel.create({
            name,
            email,
            password: hashedPassword
        })

        const token = generateToken(user._id);

        res.cookie('token', token)

        res.json({
            message:"User Created Successfully",
            token,
            success:true
        })


    } catch (error) {
        console.log(error.message)
        res.json({
            message:error.message,
            success:false
        })
    }
}
// routre for adminLogin
const adminLogin = async(req,res) =>{
    try {
        const { email, password } = req.body

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password, process.env.JWT_SECRET)
            return res.json({
                success: true,
                message: "Login Successfully",
                token
            })
        }else{
            res.json({
                success: false,
                message: "Invalid credentials"
            })
        }

    } catch (error) {
        res.json({
                success: false,
                message: error.message
            })
    }
}

export { loginUser, registerUser, adminLogin}