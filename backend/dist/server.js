"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const corsOption_1 = require("./config/corsOption");
const bookRoutes_1 = __importDefault(require("./routes/bookRoutes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)(corsOption_1.corsOptions));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// Get all books
app.use("/api/books", bookRoutes_1.default);
// Get books for a specific user
app.use("/api/auth", authRoutes_1.default);
app.listen(3500, () => {
    console.log("Server is running on port 3500");
});
