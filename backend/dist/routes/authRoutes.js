"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes = express_1.default.Router();
const authController_1 = require("../controller/authController");
// Common async handler
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
routes.post("/login", asyncHandler(authController_1.login));
// routes.post("/create", asyncHandler(createUser));
// routes.get("/refresh", asyncHandler(refresh));
exports.default = routes;
