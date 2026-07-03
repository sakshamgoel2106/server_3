import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const booksData = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/books.json"), "utf-8"));
const books = booksData;

export const getBooksByUserId = async (userId) => {
    return books.filter(book => book.userId === userId);
}

export const getBookByIdWithUserId = async (bookId, userId) => {
    const book = books.find(b => b.id === bookId);
    if (!book) {
        const err = new Error("book not found");
        err.status = 404;
        throw err;
    }

    if (book.userId !== userId) {
        const err = new Error("unauthorized access");
        err.status = 403;
        throw err;
    }

    return book;
}
