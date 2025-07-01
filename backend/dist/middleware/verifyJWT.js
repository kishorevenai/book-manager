"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    console.log(authHeader);
    if (!authHeader ||
        (Array.isArray(authHeader)
            ? !authHeader[0].startsWith("Bearer ")
            : !authHeader.startsWith("Bearer "))) {
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
    jsonwebtoken_1.default.verify(token, accessTokenSecret, (err, decoded) => {
        if (err)
            return res.status(403).json({ message: "Forbidden" });
        console.log("CHECKING RESULT", decoded);
        req.email = decoded.email;
        next();
    });
};
exports.verifyJWT = verifyJWT;
