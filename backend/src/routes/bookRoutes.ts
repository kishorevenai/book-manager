import express from "express";
const routes = express.Router();
import {
  getAllBooks,
  addBookToUser,
  getAllBooksOfUser,
  deleteUsersBook,
  updateBook,
} from "../controller/bookController";
import { verifyJWT } from "../middleware/verifyJWT";

const asyncHandler =
  (fn: any) =>
  (req: express.Request, res: express.Response, next: express.NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

routes.route("/").get(asyncHandler(getAllBooks));

routes.use(verifyJWT as express.RequestHandler);

routes.route("/add-book-to-user").post(asyncHandler(addBookToUser));
routes.route("/get-all-books-of-user").get(asyncHandler(getAllBooksOfUser));
routes.route("/delete-user-book").delete(asyncHandler(deleteUsersBook));
routes.route("/update/:id").put(asyncHandler(updateBook));

export default routes;
