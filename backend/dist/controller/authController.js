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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.refresh = exports.login = void 0;
const pgClient_1 = require("../dbConn/pgClient");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const result = yield (0, pgClient_1.query)("SELECT * FROM users WHERE email = $1", [email]);
        const user = result.rows[0];
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        const isValidPassword = yield bcrypt_1.default.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: "Invalid password" });
        }
        // Generate tokens or session here if needed
        const accessToken = jsonwebtoken_1.default.sign({ username: user.name, email: user.email }, process.env.ACCESS_TOKEN || "your_access_token_secret", { expiresIn: "1h" });
        const refreshToken = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, process.env.REFRESH_TOKEN || "your_refresh_token_secret", { expiresIn: "7d" });
        res.cookie("token", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 1 hour
        });
        res.status(200).json({
            accessToken,
        });
    }
    catch (error) { }
});
exports.login = login;
const refresh = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cookie = req.cookies;
        if (!cookie || !cookie.token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const refreshToken = cookie.token;
        jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                return res.status(403).json({ message: "Forbidden" });
            }
            const userId = decoded.email;
            try {
                const result = yield (0, pgClient_1.query)("SELECT * FROM users WHERE email = $1", [
                    userId,
                ]);
                const user = result.rows[0];
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }
                const accessToken = jsonwebtoken_1.default.sign({ username: user.name, email: user.email }, process.env.ACCESS_TOKEN, { expiresIn: "1h" });
                return res.status(200).json({ accessToken });
            }
            catch (dbError) {
                console.error("DB Error:", dbError);
                return res.status(500).json({ message: "Internal Server Error" });
            }
        }));
    }
    catch (error) {
        return res.status(400).json({ message: "Unauthorised User" });
    }
});
exports.refresh = refresh;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, username } = req.body;
    const result = yield (0, pgClient_1.query)("SELECT * FROM users WHERE email = $1", [email]);
    if (result.rows.length > 0) {
        return res.status(400).json({ message: "User already exists" });
    }
    // Hash the password before saving
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const newUser = yield (0, pgClient_1.query)("INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *", [username, email, hashedPassword]);
    res.status(201).json({
        message: "User created successfully",
        newUser: newUser.rows[0],
    });
});
exports.createUser = createUser;
