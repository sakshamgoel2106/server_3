// routing refrences

import { loginUser, getUserProfile } from "../services/authService.js";

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "email and password are required" });
        }
        const result = await loginUser(email, password);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        if (error.message === "invalid email or password") {
            return res.status(401).json({ message: "invalid email or password" });
        }
        res.status(500).json({ message: "internal server error" });
    }
};

export const getprofile = async (req, res) => {
    try {
        const profile = await getUserProfile(req.user.user_id);
        res.status(200).json(profile);
    } catch (error) {
        console.error(error);
        if (error.message === "user not found") {
            return res.status(404).json({ message: "user not found" });
        }
        res.status(500).json({ message: "internal server error" });
    }
};
