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

  if (!Array.isArray(bookIds) || bookIds.length === 0) {
    return res.status(400).json({ message: "No books provided" });
  }

  try {
    // Get the user_id using email
    const userRes = await query("SELECT user_id FROM users WHERE email = $1", [
      email,
    ]);
    const user = userRes.rows[0];
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userId = user.user_id;

    // Get existing book_ids for this user
    const existingRes = await query(
      "SELECT book_id FROM user_books WHERE user_id = $1 AND book_id = ANY($2)",
      [userId, bookIds]
    );

    const existingBookIds = existingRes.rows.map((row) => row.book_id);

    // Filter out bookIds that are already assigned
    const newBookIds = bookIds.filter(
      (bookId: number) => !existingBookIds.includes(bookId)
    );

    if (newBookIds.length === 0) {
      return res
        .status(400)
        .json({ message: "All selected books already exist in your library" });
    }

    // Insert only the new books
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
