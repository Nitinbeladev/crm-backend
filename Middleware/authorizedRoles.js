
export const authorizedRoles=(...roles)=> {

  
    return (req, res, next) => {
        console.log("roles", roles)
         console.log("authrole", req.user)
        if(!req.user) return res.status(401).json({message : "Unauthorized"})
        if(!roles.includes(req.user.role)) return res.status(401).json({message : "Unauthorized"})
      next()
    }

}