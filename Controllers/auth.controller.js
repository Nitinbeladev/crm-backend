import { sendEmail } from "../Services/email.service.js"
import { otpTemplate } from "../Templates/otp.template.js"
import { Employee } from "../Models/employee.schema.js"
import { customError } from "../Utils/customError.js"
import { success } from "../Utils/success.js"
import jwt from "jsonwebtoken"
import { genrateAccessToken, genrateRefreshToken } from "../Utils/tokens.js"
import bcrypt from "bcrypt"
import Student from "../Models/student.schema.js"
import mongoose from "mongoose"


// login controlles
 const authController = async(req,res)=> {
        const {email, password} = req.body
        if(!email || !password) {
          throw new customError(400,"all fields are required" )
        }
        const user = await Employee.findOne({email})
        if(!user) {
             throw new customError(400,"user not found")
        }
        // password check
        const isMatched =await bcrypt.compare(password, user.password)
        if(isMatched == false) {
          throw new customError(400,"Invalid credentials")
        }
        if(user.isVerified == true) {
         // jwt token
        const payload = {userId : user._id, role : user.role}
        const accessToken = genrateAccessToken(payload)
        const refreshToken = genrateRefreshToken(payload)
   
        // sending refresh token in cookies
         res.cookie("refreshToken" , refreshToken,
           {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000     
           }
         )
        return success(res,200,"Login Successfull", {accessToken , userId : user._id })
        }
        // sending email
         const otp = Math.floor((Math.random() * 10000)+90000)
         const content = otpTemplate.replace("{OTP}", otp)
         // saving otp in the database
         user.otp = otp
         await user.save() // saving user afer saving otp
         //  sendEmail(email,"OTP Verification", content)
         success(res,201,"Otp has been sent successfully check Email")
}

// sent otp controller
const checkOtpController = async(req, res)=> {
    const {email, otp} = req.body
    if(!email || ! otp) { 
       throw new customError(400,"All fields are required" )
    }
    const user = await Employee.findOne({email})
    if(user.otp != otp) {
        throw new customError(401,"Invalid OTP" )
    }
    user.otp = null
    user.isVerified = true
    await user.save()
  
    // send access token 
    const payload = {userId : user._id, role : user.role}
    const accessToken = genrateAccessToken(payload)
    // sending refresh token in cookies
    res.cookie("refreshToken" , refreshToken,
    {
            httpOnly: true,
            secure: false,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000           
     })
    success(res,200,"OTP verified successfully", accessToken )
   
}

// generate new token controller
const refreshAccessToken = async(req, res)=> {
    console.log("refresh called")
  const {refreshToken} = req.cookies
  

  if(!refreshToken) {
    throw new customError(400, "Refresh Token not found")
  }

 const decoded = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET_KEY)
  
  if(!decoded) {
    throw new customError(403, "Refresh Token Expired")
  }
 
  const payload = {userId :decoded.userId, role : decoded.role}

  const newAccessToken = genrateAccessToken(payload)
  success(res,200,"new access token generated", newAccessToken)
}

// get user data for dashboard controller

const getUserData = async(req, res)=> {
       const {userId} = req.params

       if(!userId) {
        throw new customError(400, "No user Id found")
       }

       const userDetails = await Employee.findById(userId).populate("students");
    

       if(!userDetails) {
         throw new customError(400, "No user found")
       }
        
       const data = {
         name: userDetails.name,
         email: userDetails.email,
         phone: userDetails.phone,
         Students: userDetails.students,
       };
       success(res, 200, "User data fetched successfully", data)

}
export {authController,checkOtpController ,refreshAccessToken,getUserData}