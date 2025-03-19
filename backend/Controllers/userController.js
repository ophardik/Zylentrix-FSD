const bcrypt=require("bcrypt");
const userModel=require("../Models/userModel")
const jwt=require("jsonwebtoken");

const signup=async(req,res)=>{
    try {
        const {userName,email,password}=req.body;
        const existUser=await userModel.findOne({email})
        if(existUser){
            return res.status(400).json({message:"User already exist"})
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const user=await userModel.create({
            userName,
            email,
            password:hashedPassword
        })
        res.status(201).json({message:"User created successfully",user})
    } catch (error) {
        console.log("error in creating user",error);
        res.status(500).json({ message:"Failed to signup "})
    }
}

const login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await userModel.findOne({email});
        const isValidPassowrd=await bcrypt.compare(password,user.password)
        const token = jwt.sign({ email: user.email },  process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({
            message: "User logged in successfully",
            _id:user._id,
            userName: user.userName,
            email: user.email,
            token,
        })

    } catch (error) {
        console.log("error while logging in",error);
        return res.status(400).json({
            message:"Failed to login "
        })
    }
}


module.exports={signup,login}