import mongoose  from "mongoose";
import dotenv from "dotenv"

dotenv.config()

const dbConnect = async()=> {
  
   try {
     await mongoose.connect(process.env.DB_URL)
    console.log("data base connected successfully")
   } catch (error) {
    console.log(error)
    throw error
   }
}

export default dbConnect