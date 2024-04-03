import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import User from "../models/User.js";
import { firebaseStorage } from "../firebaseAdmin.js";

// Register user

export const register = async(req,res,picturepath)=>{
    try{

        const {
            firstname,
            lastname,
            email,
            password,
            friends,
            location,
            occupation,
            viewedprofile,
            impression
        }=req.body;

        const salt=await bcrypt.genSalt();
        const passwordHash=await bcrypt.hash(password,salt);

        const newUser = new User({
            firstname,
            lastname,
            email,
            password:passwordHash,
            picturepath,
            friends,
            location,
            occupation,
            viewedprofile:Math.floor(Math.random()*100),
            impression:Math.floor(Math.random()*100)
        });
        const savedUser = await newUser.save();
        console.log(`Register console :${savedUser}`)
        




        res.status(201).json(savedUser);

    }catch(error){
        res.status(500).json({error:error.message});

    }
};

/* lOGGING IN */
export const login = async(req,res)=>{
    try{
        const{email,password}=req.body;
        let user= await User.findOne({email:email});
        if(!user) return res.status(400).json({msg:"User does not exist. "});
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({msg:"Invalid Credential"});

        const token=Jwt.sign({id:user._id},process.env.JWT_SECRET);
        user = user.toObject(); // Convert Mongoose document to plain JavaScript object
        delete user.password;
        res.status(200).json({token,user});

    }catch(error){
        res.status(500).json({error:error.message});

    }
}