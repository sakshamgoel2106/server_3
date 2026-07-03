import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/jwt.js";

export const authentication = (req,res,next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    
    if(!token){
        return res.status(401).json({message:"unauthorized access, token not found"}); 
    }
    try{
        const verified = jwt.verify(token,JWT_SECRET);
        req.user = verified;
        next();
    }catch(error){
        return res.status(403).json({message:"forbidden access, invalid token"});
    }
};


// Checks whether the token's signature matches JWT_SECRET.
// Checks whether the token has expired.
// Decodes the payload if the token is valid.