const jwt=require("jsonwebtoken");
require("dotenv").config({path:"../Config/.env"})
const authMiddleware=(req,res,next)=>{
    const token=req.header("Authorization");
    if(!token) return res.status(401).send("Access Denied");
    try {
        const verified=jwt.verify(token.split(" ")[1],process.env.JWT_SECRET);
        req.user=verified;
        console.log("req.user",req.user)
        next();
    } catch (error) {
        console.log("error while authenticating",error)
        res.status(400).send("Invalid Token");
    }
}

module.exports=authMiddleware;