import { Employee } from "../Models/employee.schema.js"
import bcrypt from "bcrypt"
import { customError } from "../Utils/customError.js"
import { success } from "../Utils/success.js"

// create user with roles api
const createUserController = async(req, res)=> {
      
        const {name, email, phone, role, password} = req.body

        if(!name || !email || ! phone || !role || !password) {
            throw new customError(400, "All fields are required")
        }
        
        const user = await Employee.findOne({email})
   
        if(user) {
              throw new customError(401, "User already exists")
        }
       /// password encryption
       const hashedPassword = await bcrypt.hash(password,10)
        const newUser = await Employee.create({name, email, phone, role,password : hashedPassword})
         
        success(res,201,"user created Successfully")

}

// const createUserController = async(req, res)=> {
//         const {name, email, phone, role, password} = req.body

//         if(!name || !email || ! phone || !role || !password) {
//             throw new appError(400,"all fields are required")
//         }
        
//         const user = await Employee.findOne({email})
   
//         if(user) {
//             throw new appError(401, "user already exists")
//         }
//        /// password encryption
//        const hashedPassword = await bcrypt.hash(password,10)
//         const newUser = await Employee.create({name, email, phone, role,password : hashedPassword})
         
//         // sending email
//         //  const otp = Math.floor((Math.random() * 10000)+90000)
//         //  const content = otpTemplate.replace("{OTP}", otp)
//         //  sendEmail(email,"OTP Verification", content)

//         success(res,"User Created Successfully", 201)
// }

export {createUserController}