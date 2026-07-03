import { getBooksByUserId, getBookByIdWithUserId } from "../services/bookService.js";

export const getMyBooks = async (req, res) => {
    try {
        const userBooks = await getBooksByUserId(req.user.user_id);
        res.status(200).json(userBooks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "internal server error" });
    }
};

export const getBooksbyId = async (req, res) => {
    try {
        const bookId = parseInt(req.params.id, 10);
        const authorizedBook = await getBookByIdWithUserId(bookId, req.user.user_id);
        return res.status(200).json(authorizedBook);
    } catch (error) {
        if (error.status === 404) {
            return res.status(404).json({ message: "book not found" });
        }
        if (error.status === 403) {
            return res.status(403).json({ message: "unauthorized access" });
        }
        console.error(error);
    return res.status(500).json({ message: "internal server error" });
    }
};
