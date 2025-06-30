import express from "express";
const routes = express.Router();
import { getAllBooks, addBookToUser } from "../controller/bookController";

// Common async handler
const asyncHandler =
  (fn: any) =>
  (req: express.Request, res: express.Response, next: express.NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

routes.route("/").get(asyncHandler(getAllBooks));

routes.route("/add-book-to-user").post(asyncHandler(addBookToUser));

export default routes;
