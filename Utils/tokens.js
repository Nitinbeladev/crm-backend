import jwt from "jsonwebtoken"

export const genrateAccessToken = (payload)=> {
  return jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET_KEY, {expiresIn : "10m"})
}

export const genrateRefreshToken = (payload)=> {
  return jwt.sign(payload,process.env.REFRESH_TOKEN_SECRET_KEY , {expiresIn : "7d"})
}