import { getBooksByUserId, getBookByIdWithUserId } from "../services/bookService.js";
import { successResponse, errorResponse } from "../handler/responsehandler.js";

export const getMyBooks = async (req, res) => {
    try {
        const userBooks = await getBooksByUserId(req.user.user_id);
        return successResponse(res, userBooks, "books retrieved", 200);
    } catch (error) {
        console.error(error);
        return errorResponse(res);
    }
};

export const getBooksbyId = async (req, res) => {
    try {
        const bookId = parseInt(req.params.id, 10);
        const authorizedBook = await getBookByIdWithUserId(bookId, req.user.user_id);
        return successResponse(res, authorizedBook, "book retrieved", 200);
    } catch (error) {
        if (error.status === 404) {
            return errorResponse(res, "book not found", 404);
        }
        if (error.status === 403) {
            return errorResponse(res, "unauthorized access", 403);
        }
        console.error(error);
        return errorResponse(res);
    }
};
