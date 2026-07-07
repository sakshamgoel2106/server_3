import express from "express";
import { login, getprofile } from "../controllers/authcontroller.js";
import { getMyBooks, getBooksbyId } from "../controllers/bookcontroller.js";
import { authentication } from "../middlewares/auth.js";

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({ message: "Server is running" });
});

router.post('/auth/login', login);
router.get('/auth/profile', authentication, getprofile);

router.get('/books', authentication, getMyBooks);
router.get('/books/:id', authentication, getBooksbyId);

export default router;