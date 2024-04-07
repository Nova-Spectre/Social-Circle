import Post from "../models/Post.js";
import User from "../models/User.js";
import { uploadPicture } from "../index.js";

//Create

export const createPost =async(req,res,picturepath)=>{
    try{
        console.log("CreatePost Function triggered")

        const{userId , description }=req.body;
       

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

    

        const newPost = new Post({
            userId,
            firstname:user.firstname,
            lastname:user.lastname,
            location:user.location,
            description,
            userpicturepath:user.picturepath,
            picturepath:picturepath || null ,
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

        const post=await Post.find();
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

export const addComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId, username, commentText } = req.body;

        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const newComment = {
            userId,
            username,
            commentText
        };

        post.comments.push(newComment);
        await post.save();
        
        const updatedPost = await Post.findById(id); // Fetching the post again after saving the comment

        res.status(201).json(updatedPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


export const updateComment = async (req, res) => {
    try {
        const { id, commentId } = req.params;
        const { commentText } = req.body;

        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const commentIndex = post.comments.findIndex(comment => comment._id.toString() === commentId);
        if (commentIndex === -1) {
            return res.status(404).json({ message: "Comment not found" });
        }

        // Update the comment text
        post.comments[commentIndex].commentText = commentText;
        await post.save();

        res.status(200).json(post);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
