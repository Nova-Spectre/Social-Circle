import express from "express";
import {
    getFeedPosts,
    getUserPosts,
    likePost,
    addComment,
    updateComment

} from "../controller/posts.js";

import verifyToken from "../middleware/auth.js";


const router=express.Router();

//Read

router.get("/",verifyToken,getFeedPosts);
router.get("/:userId/posts",verifyToken,getUserPosts);


//Update

router.patch("/:id/like",verifyToken,likePost);
router.post("/:id/comments", verifyToken, addComment);
router.patch("/:id/comments/:commentId", verifyToken, updateComment);




export default router;
