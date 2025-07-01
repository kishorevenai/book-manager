import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

// Extend Express Request interface to include 'email'
declare module "express-serve-static-core" {
  interface Request {
    email?: string;
  }
}

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  console.log(authHeader);

  if (
    !authHeader ||
    (Array.isArray(authHeader)
      ? !authHeader[0].startsWith("Bearer ")
      : !authHeader.startsWith("Bearer "))
  ) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = Array.isArray(authHeader)
    ? authHeader[0].split(" ")[1]
    : authHeader.split(" ")[1];

  const accessTokenSecret = process.env.ACCESS_TOKEN;
  if (!accessTokenSecret) {
    return res
      .status(500)
      .json({ message: "Internal server error: ACCESS_TOKEN not set" });
  }

  jwt.verify(token, accessTokenSecret as string, (err, decoded: any) => {
    if (err) return res.status(403).json({ message: "Forbidden" });

    req.email = decoded.email;

    next();
  });
};
