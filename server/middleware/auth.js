import jwt from "jsonwebtoken";


export const verifyToken = async(req,res,next)=>{
    try{
        let token=req.header("Authorization");

        if(!token){
            return res.status(401).send("Access Denied: No token provided");
        }
        if(token.startsWith("Bearer ")){
            token=token.slice(7,token.length).trimLeft();
        }

        const verified=jwt.verify(token,process.env.JWT_SECRET);
        req.user=verified;
        next();

    }catch(err){
        if (err.name === "TokenExpiredError") {
            return res.status(401).send("Access Denied: Token expired");
        }
        return res.status(401).send("Access Denied: Invalid token");
    }
};
export default verifyToken;