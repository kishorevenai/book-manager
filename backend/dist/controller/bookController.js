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
exports.addBookToUser = exports.getAllBooks = void 0;
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
    const { bookIds, email } = req.body;
    console.log(bookIds, email);
    // try {
    //   // Check if the books already exist for the user
    //   const existingBooks = await query(
    //     "SELECT * FROM user_books WHERE user_id = $1 AND book_id = ANY($2)",
    //     [userId, bookIds]
    //   );
    //   if (existingBooks.rows.length > 0) {
    //     return res
    //       .status(400)
    //       .json({ message: "Some books already exist in your library" });
    //   }
    //   // Add the books to the user's library
    //   const promises = bookIds.map((bookId: number) =>
    //     query("INSERT INTO user_books (user_id, book_id) VALUES ($1, $2)", [
    //       userId,
    //       bookId,
    //     ])
    //   );
    //   await Promise.all(promises);
    //   res.status(201).json({ message: "Books added to your library" });
    // } catch (error) {
    //   res.status(500).json({ message: "Error adding books to your library" });
    // }
});
exports.addBookToUser = addBookToUser;
