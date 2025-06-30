import express from "express";
const routes = express.Router();
import { login, createUser, refresh } from "../controller/authController";

// Common async handler
const asyncHandler =
  (fn: any) =>
  (req: express.Request, res: express.Response, next: express.NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

routes.post("/login", asyncHandler(login));
routes.post("/create", asyncHandler(createUser));
routes.get("/refresh", asyncHandler(refresh));

export default routes;
