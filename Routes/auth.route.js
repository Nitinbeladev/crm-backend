import express from "express"
import { authController,checkOtpController ,refreshAccessToken,getUserData } from "../Controllers/auth.controller.js"
import { asyncHandler } from "../Utils/asyncHandler.js"
import { authCheck } from "../Middleware/authCheck.middleware.js"
import { errorHandler } from "../Utils/globalError.js"
import { authorizedRoles } from "../Middleware/authorizedRoles.js"


export const authRoute  = express.Router()


authRoute.post("/login",asyncHandler(authController) )

authRoute.post("/otp-verify" ,asyncHandler (checkOtpController))

authRoute.post("/refresh" , asyncHandler(refreshAccessToken))
//authCheck, below
authRoute.get("/user/:userId", asyncHandler(getUserData))

authRoute.get("/test-route", authCheck ,authorizedRoles( "hr") ,async (req,res)=> {
     try {
          res.send("You are authenticated")
     } catch (error) {
         throw new errorHandler(500, "Internal server error")
     }
})
