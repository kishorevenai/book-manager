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
  const { bookIds } = req.body;
  const email = req.email;

  console.log(bookIds, email);

  if (!Array.isArray(bookIds) || bookIds.length === 0) {
    return res.status(400).json({ message: "No books provided" });
  }

  try {
    const userres = await query("select user_id from users where email = $1", [
      email,
    ]);
    const user = userres.rows[0];

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userId = user.user_id;

    const existingRes = await query(
      "SELECT book_id FROM user_books WHERE user_id = $1 AND book_id = ANY($2)",
      [userId, bookIds]
    );

    const existingBookIds = existingRes.rows.map((row) => row.book_id);

    const newBookIds = bookIds.filter(
      (bookId: number) => !existingBookIds.includes(bookId)
    );

    if (newBookIds.length === 0) {
      return res
        .status(400)
        .json({ message: "All selected books already exist in your library" });
    }

    const insertPromises = newBookIds.map((bookId) =>
      query(
        "INSERT INTO user_books (user_id, book_id, assigned_at) VALUES ($1, $2, NOW())",
        [userId, bookId]
      )
    );
    await Promise.all(insertPromises);

    res
      .status(201)
      .json({ message: "Books added to your library", addedBooks: newBookIds });
  } catch (error) {
    console.error("Error adding books:", error);
    res.status(500).json({ message: "Error adding books to your library" });
  }
};

export const getAllBooksOfUser = async (req: Request, res: Response) => {
  const email = req.email;

  try {
    // Get the user_id from the email
    const userRes = await query("SELECT user_id FROM users WHERE email = $1", [
      email,
    ]);
    const user = userRes.rows[0];

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userId = user.user_id;

    // Join user_books and books to get book details
    const booksRes = await query(
      `SELECT b.book_id, b.title, b.author, b.published_date
       FROM user_books ub
       JOIN books b ON ub.book_id = b.book_id
       WHERE ub.user_id = $1`,
      [userId]
    );

    return res.status(200).json(booksRes.rows);
  } catch (error) {
    console.error("Error getting books:", error);
    res.status(500).json({ message: "Error getting books from your library" });
  }
};

export const deleteUsersBook = async (req: Request, res: Response) => {
  const email = req.email;
  const { bookId } = req.body;

  console.log(bookId, email);

  if (!bookId) {
    return res.status(400).json({ message: "bookId is required" });
  }

  try {
    // Get user_id from email
    const userRes = await query("SELECT user_id FROM users WHERE email = $1", [
      email,
    ]);
    const user = userRes.rows[0];

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userId = user.user_id;

    // Delete the book for this user
    const deleteRes = await query(
      "DELETE FROM user_books WHERE user_id = $1 AND book_id = $2",
      [userId, bookId]
    );

    if (deleteRes.rowCount === 0) {
      return res
        .status(404)
        .json({ message: "Book not found in user's library" });
    }

    return res
      .status(200)
      .json({ message: "Book deleted from user's library" });
  } catch (error) {
    console.error("Error deleting book:", error);
    return res
      .status(500)
      .json({ message: "Error deleting book from user's library" });
  }
};
