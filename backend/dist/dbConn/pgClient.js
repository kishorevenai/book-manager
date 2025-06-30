"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = exports.pool = void 0;
const pg_1 = require("pg");
exports.pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
});
exports.pool.on("connect", () => {
    console.log("✅ Connected to PostgreSQL");
});
exports.pool.on("error", (err) => {
    console.error("❌ PostgreSQL Client Error:", err);
    process.exit(-1);
});
const query = (text, params) => {
    return exports.pool.query(text, params);
};
exports.query = query;
