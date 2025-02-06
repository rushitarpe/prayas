import bcryptjs from "bcryptjs"
import User from '../models/user.model.js';



export const signup = async (req,res,next) => {
    const { username,email,password } = req.body
    console.log(req.body)
    if(!username || 
        !email ||
         !password || 
         username === "" ||
        email === "" || password === "") {  
           return res.status(400).json({message:"All fields are required"})
        }
        const hashedPassword=bcryptjs.hashSync(password,10)
        const newUser = new User({
            username,
            email,
            password:hashedPassword,
        })
try{
    await newUser.save()
    res.json("Signup Successfull")
}catch(error)
{
   next(error)
}
}