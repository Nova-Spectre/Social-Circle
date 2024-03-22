import Post from "../models/Post.js";
import User from "../models/User.js";

//Create

export const createPost =async(req,res)=>{
    try{

        const{userId , description , picturepath}=req.body;
        const user=await User.findById(userId);
        const newPost = new Post({
            userId,
            firstname:user.firstname,
            lastname:user.lastname,
            location:user.location,
            description,
            userpicturepath:user.picturepath,
            picturepath,
            likes:{},
            comment:[]
            

        })

        await newPost.save();

        const post=await Post.find();
        res.status(201).json(post);
    }
    catch(err){
        res.status(409).json({message:err.message});
    }
        
}

//Read

export const getFeedPosts = async(req,res)=>{
    try{

        const post=await Post.find().sort({ createdAt: -1 });
        res.status(200).json(post);

    }catch(err){

        res.status(404).json({message:err.message});
    }
}

export const getUserPosts = async(req,res)=>{
    try{
        const {userId} =req.params;
        const post=await Post.find({userId}).sort({ createdAt: -1 });
        res.status(200).json(post);

    }catch(err){

        res.status(404).json({message:err.message});
    }
}

//Update

export const likePost = async(req,res)=>{
    try{
        const {id} =req.params;
        const {userId} =req.body;

        const post= await Post.findById(id);
        const isLiked = post.likes.get(userId);
        if(isLiked){
            post.likes.delete(userId);
        }else{
            post.likes.set(userId,true);
        }

        const updatedPost = await Post.findByIdAndUpdate(id,
            {likes:post.likes},
            {new:true}
            
            )

        res.status(200).json(updatedPost);

    }catch(err){                                                                                                                                                                                                                                                                                             

        res.status(404).json({message:err.message});
    }
}

