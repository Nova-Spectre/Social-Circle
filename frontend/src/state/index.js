import { createSlice } from "@reduxjs/toolkit";
import { React } from "react-dom/test-utils";

const initialState={
    mode:"dark",
    user:null,
    token:null,
    posts:[],
    friends:[]

}

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setMode:(state)=>{
            state.mode = state.mode=="light"?"dark":"light";
        },
        setLogin:(state,action)=>{
            state.user=action.payload.user;
            state.token=action.payload.token;
        },
        setLogout:(state,action)=>{
            state.user=null;
            state.token=null;
        },
        setFriends:(state,action)=>{
           if(state.user){
            state.user = {
                ...state.user,
                friends: action.payload.friends
              }
           }else{
            console.error("User Friends non-existent :( ")
           }
        },
        setPosts:(state,action)=>{
            state.posts=action.payload.posts;
        },
        setPost:(state,action)=>{
            const updatedPosts=state.posts.map((post)=>{
                if(post._id===action.payload.post._id) return action.payload.post;
                return post;
            });
            state.posts=updatedPosts;
        },
        setComment: (state, action) => {
            const { postId, comment } = action.payload;
            const updatedPosts = state.posts.map((post) => {
              if (post._id === postId) {
                // Update comments array for the specific post
                post.comments.push(comment);
              }
              return post;
            });
            state.posts = updatedPosts;
          },
      


    }
})

export const {setMode,setLogin,setLogout,setFriends,setPosts,setPost,setComment}=authSlice.actions;
export default authSlice.reducer;