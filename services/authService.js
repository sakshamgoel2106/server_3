import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {JWT_SECRET, JWT_EXPIRATION} from "../config/jwt.js";
import users from "../data/users.json" with {type: "json"};

export const loginUser = async (email, password) => {
    // Find the user by email
    const user = users.find(u => u.email === email);
    if(!user){
        throw new Error("invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        throw new Error("invalid email or password");
    }
    // generate a JWT token for the authenticated user
    const token = jwt.sign({user_id: user.id, email: user.email}, JWT_SECRET, {expiresIn: JWT_EXPIRATION});

    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    };
};

export const getUserProfile = async (userId) => {
    const user = users.find(u => u.id === userId);
    if(!user){
        throw new Error("user not found");
    }
    return user;
}