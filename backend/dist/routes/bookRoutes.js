"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes = express_1.default.Router();
const bookController_1 = require("../controller/bookController");
// Common async handler
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
routes.route("/").get(asyncHandler(bookController_1.getAllBooks));
routes.route("/add-book-to-user").post(asyncHandler(bookController_1.addBookToUser));
exports.default = routes;
