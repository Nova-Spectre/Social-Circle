import User from "../models/User.js";

//Read
export const getUser=async(req,res)=>{
    try{
        const {id}=req.params;
        const user= await User.findById(id);
        res.status(200).json(user);

    }catch(err){
        res.status(404).json({message:err.message});
    }
}


export const getUserFriends=async(req,res)=>{
    try{
        const {id}=req.params;
        const user= await User.findById(id);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                

        const friends = await Promise.all(
            user.friends.map((id)=>
                User.findById(id))
        );

        const formattedFriends = friends.map(
            ({_id,firstname,lastname,occupation,location,picturepath})=>{
                return {_id,firstname,lastname,occupation,location,picturepath};
            }
        );

        res.status(200).json(formattedFriends);

    }catch(err){
        res.status(404).json({message:err.message});
    }


   


}
//Update
export const addRemoveFriends=async(req,res,next)=>{
    try{
        const {id,friendId }=req.params;
        const user=await User.findById(id);
        const friend=await User.findById(friendId);

        const isFriend = user.friends.includes(friendId);

        if (isFriend) {
            
            user.friends = user.friends.filter((friend) => friend.toString() !== friendId);
            friend.friends = friend.friends.filter((friend) => friend.toString() !== id);
        } else {
            
            user.friends.push(friendId);
            friend.friends.push(id);
        }

       
        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id)=>
                User.findById(id))
        );

        const formattedfriends = friends.map(
            ({_id,firstname,lastname,occupation,location,picturepath})=>{
                return {_id,firstname,lastname,occupation,location,picturepath};
            }
        );

        res.status(200).json(formattedfriends);


    }catch(err){
        res.status(404).json({message:err.message});
    }

}