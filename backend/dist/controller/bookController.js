"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsersBook = exports.getAllBooksOfUser = exports.addBookToUser = exports.getAllBooks = void 0;
const pgClient_1 = require("../dbConn/pgClient");
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, pgClient_1.query)("SELECT * FROM books");
        res.status(200).json(result.rows);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching books" });
    }
});
exports.getAllBooks = getAllBooks;
const addBookToUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookIds } = req.body;
    const email = req.email;
    console.log(bookIds, email);
    if (!Array.isArray(bookIds) || bookIds.length === 0) {
        return res.status(400).json({ message: "No books provided" });
    }
    try {
        const userres = yield (0, pgClient_1.query)("select user_id from users where email = $1", [
            email,
        ]);
        const user = userres.rows[0];
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const userId = user.user_id;
        const existingRes = yield (0, pgClient_1.query)("SELECT book_id FROM user_books WHERE user_id = $1 AND book_id = ANY($2)", [userId, bookIds]);
        const existingBookIds = existingRes.rows.map((row) => row.book_id);
        const newBookIds = bookIds.filter((bookId) => !existingBookIds.includes(bookId));
        if (newBookIds.length === 0) {
            return res
                .status(400)
                .json({ message: "All selected books already exist in your library" });
        }
        const insertPromises = newBookIds.map((bookId) => (0, pgClient_1.query)("INSERT INTO user_books (user_id, book_id, assigned_at) VALUES ($1, $2, NOW())", [userId, bookId]));
        yield Promise.all(insertPromises);
        res
            .status(201)
            .json({ message: "Books added to your library", addedBooks: newBookIds });
    }
    catch (error) {
        console.error("Error adding books:", error);
        res.status(500).json({ message: "Error adding books to your library" });
    }
});
exports.addBookToUser = addBookToUser;
const getAllBooksOfUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.email;
    try {
        // Get the user_id from the email
        const userRes = yield (0, pgClient_1.query)("SELECT user_id FROM users WHERE email = $1", [
            email,
        ]);
        const user = userRes.rows[0];
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const userId = user.user_id;
        // Join user_books and books to get book details
        const booksRes = yield (0, pgClient_1.query)(`SELECT b.book_id, b.title, b.author, b.published_date
       FROM user_books ub
       JOIN books b ON ub.book_id = b.book_id
       WHERE ub.user_id = $1`, [userId]);
        return res.status(200).json(booksRes.rows);
    }
    catch (error) {
        console.error("Error getting books:", error);
        res.status(500).json({ message: "Error getting books from your library" });
    }
});
exports.getAllBooksOfUser = getAllBooksOfUser;
const deleteUsersBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.email;
    const { bookId } = req.body;
    console.log(bookId, email);
    if (!bookId) {
        return res.status(400).json({ message: "bookId is required" });
    }
    try {
        // Get user_id from email
        const userRes = yield (0, pgClient_1.query)("SELECT user_id FROM users WHERE email = $1", [
            email,
        ]);
        const user = userRes.rows[0];
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const userId = user.user_id;
        // Delete the book for this user
        const deleteRes = yield (0, pgClient_1.query)("DELETE FROM user_books WHERE user_id = $1 AND book_id = $2", [userId, bookId]);
        if (deleteRes.rowCount === 0) {
            return res
                .status(404)
                .json({ message: "Book not found in user's library" });
        }
        return res
            .status(200)
            .json({ message: "Book deleted from user's library" });
    }
    catch (error) {
        console.error("Error deleting book:", error);
        return res
            .status(500)
            .json({ message: "Error deleting book from user's library" });
    }
});
exports.deleteUsersBook = deleteUsersBook;
