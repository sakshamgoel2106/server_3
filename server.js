import express from "express";
import dotenv from "dotenv";
dotenv.config();
import {login,getprofile} from "./controllers/authcontroller.js";
import {getMyBooks,getBooksbyId} from "./controllers/bookcontroller.js";
import {authentication} from "./middlewares/auth.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({message: "Server is running"});
});

app.post('/auth/login',login);
app.get('/auth/profile',authentication,getprofile);

app.get('/books',authentication,getMyBooks);
app.get('/books/:id',authentication,getBooksbyId);


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});