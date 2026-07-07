import { loginUser, getUserProfile } from "../services/authService.js";
import { successResponse, errorResponse } from "../handler/responsehandler.js";

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return errorResponse(res, "email and password are required", 400);
        }
        const result = await loginUser(email, password);
        return successResponse(res, result, "login successful", 200);
    } catch (error) {
        console.error(error);
        if (error.message === "invalid email or password") {
            return errorResponse(res, "invalid email or password", 401);
        }
        return errorResponse(res);
    }
};

export const getprofile = async (req, res) => {
    try {
        const profile = await getUserProfile(req.user.user_id);
        return successResponse(res, profile, "profile retrieved", 200);
    } catch (error) {
        console.error(error);
        if (error.message === "user not found") {
            return errorResponse(res, "user not found", 404);
        }
        return errorResponse(res);
    }
};
