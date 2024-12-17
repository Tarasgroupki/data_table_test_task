"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const database_1 = __importDefault(require("./database"));
const users_1 = __importDefault(require("./routes/users"));
const admin_1 = __importDefault(require("./routes/admin"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
// Connect to MongoDB
(0, database_1.default)();
app.use((0, cors_1.default)());
app.use('/users', users_1.default);
app.use('/admin', admin_1.default);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
