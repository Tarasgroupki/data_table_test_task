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
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../models/User"));
const app = express_1.default.Router();
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find();
        return res.status(200).json(users);
    }
    catch (err) {
        throw err;
    }
}));
app.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, aboutMe, address, birthdate } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: 'Email and password are required.' });
            return;
        }
        const hash = yield bcrypt_1.default.hash(password, 10);
        const newUser = new User_1.default({ email, password: hash, aboutMe, address, dateOfBirth: birthdate });
        const savedUser = yield newUser.save();
        res.send(savedUser);
    }
    catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Error creating user', error });
    }
}));
exports.default = app;
