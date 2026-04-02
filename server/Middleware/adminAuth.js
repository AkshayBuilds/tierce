import jwt from 'jsonwebtoken'

const adminAuth = async(req,res,next) => {
    try {
        const { token } = req.headers
        if(!token){
            return res.json({
                success: false,
                messgae:"Not Authortized Login Again"
            })
        }
        const decode_token = jwt.verify(token, process.env.JWT_SECRET)

        if(decode_token !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD ){
            return res.json({
                success: false,
                messgae:"Not Authortized Login Again"
            })
        }
        next()

    } catch (error) {
        return res.json({
                success: false,
                messgae:error.message
            })
    }
}

export default adminAuth
