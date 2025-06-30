import { Request, Response } from "express";
import { query } from "../dbConn/pgClient";

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const result = await query("SELECT * FROM books");
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books" });
  }
};

export const addBookToUser = async (req: Request, res: Response) => {
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
};
