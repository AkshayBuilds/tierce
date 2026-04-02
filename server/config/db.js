import mongoose from "mongoose";

const connect_db = async() => {

    mongoose.connection.on('connected', () => {
        console.log('Database Connected Successfully')
    })

    await mongoose.connect(`${process.env.MONGODB_URI}/forever`)
}


export default connect_db;