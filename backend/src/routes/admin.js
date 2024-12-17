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
const Config_1 = __importDefault(require("../models/Config"));
const app = express_1.default.Router();
app.get('/settings/:page', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page } = req.params;
        const pageSettings = yield Config_1.default.findOne({ page });
        if (!pageSettings) {
            return res.status(404).json({ message: 'Settings not found' });
        }
        res.status(200).json({ pageSettings });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching settings', error });
    }
}));
app.post('/settings', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, components } = req.body;
        if (!page || !Array.isArray(components) || components.length === 0) {
            return res.status(400).json({ message: 'Invalid data' });
        }
        let pageSettings = yield Config_1.default.findOne({ page });
        if (pageSettings) {
            pageSettings.components = components;
            yield pageSettings.save();
        }
        else {
            pageSettings = new Config_1.default({ page, components });
            yield pageSettings.save();
        }
        res.status(200).json({ message: 'Settings updated successfully', pageSettings });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating settings', error });
    }
}));
exports.default = app;
