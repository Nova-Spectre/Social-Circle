import express from "express";
import {
    getFeedPosts,
    getUserPosts,
    likePost,
<<<<<<< HEAD
    addComment,
    updateComment
=======
>>>>>>> 9743a77b8410763845396a8d0f898c4ba13bedf3

} from "../controller/posts.js";

import verifyToken from "../middleware/auth.js";


const router=express.Router();

//Read

router.get("/",verifyToken,getFeedPosts);
router.get("/:userId/posts",verifyToken,getUserPosts);


//Update

router.patch("/:id/like",verifyToken,likePost);
<<<<<<< HEAD
router.post("/:id/comments", verifyToken, addComment);
router.patch("/:id/comments/:commentId", verifyToken, updateComment);

=======
>>>>>>> 9743a77b8410763845396a8d0f898c4ba13bedf3



export default router;