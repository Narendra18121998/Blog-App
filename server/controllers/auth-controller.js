import authmodel from "../models/auth-model.js"
import bcyrptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
//logic for user registration
const userRegistration=async(req,res)=>{
    const{username,email,password} = req.body
    try {
        if(username && email && password){
            const isUser = await authmodel.findOne({email:email})
            if(!isUser){
                //password hashing
                const genSalt = await bcyrptjs.genSalt(10);
                const hashedPassword = await bcyrptjs.hash(password,genSalt)

                //create  a new user
                const newUser = new authmodel({
                    username:username,
                    email:email,
                    password:hashedPassword
                })

                //save new user
                const savedUser = await newUser.save()
                if(savedUser){
                    return res.status(200).json({message:"User registered successfully"})
                }
            }
            else{
                return res.status(404).json({message:"User already exists"})
            }
        }
        else{
            return res.status(404).json({message:"all fields are required"})
        }
    } 
    catch (error) {
        return res.status(404).json({message:error.message})    
    }
}

const userLogin=async(req,res)=>{
    const {email,password} = req.body;
    try {
        if(email&&password){
            const isEmail = await authmodel.findOne({email:email})
            if(isEmail){
                if(isEmail.email === email && await bcyrptjs.compare(password,isEmail.password)){
                    //generate token
                    const token = jwt.sign({UserId:isEmail._id} , "SecretKey" , {expiresIn:"2d"})
                    return res.status(200).json({
                        message:"Login Successful",
                        token,
                        username:isEmail.username
                    })
                }
                else{
                    return res.status(404).json({message:"Invalid credentials"})
                }
            }
            else{
                return res.status(404).json({message:"Email ID not found"})
            }
        }
        else{
            return res.status(404).json({message:"all fields are required"})
        }
    } 
    catch (error) {
        return res.status(404).json({message:error.message})     
    }
}

export { userRegistration , userLogin};
