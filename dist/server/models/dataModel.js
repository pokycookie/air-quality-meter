"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dataSchema = new mongoose_1.default.Schema({
    pm10: {
        type: Number,
        required: true,
        trim: true,
    },
    pm25: {
        type: Number,
        required: true,
        trim: true,
    },
    pm100: {
        type: Number,
        required: true,
        trim: true,
    },
    form: {
        type: Number,
        required: true,
        trim: true,
    },
    temp: {
        type: Number,
        required: true,
        trim: true,
    },
    humi: {
        type: Number,
        required: true,
        trim: true,
    },
});
exports.default = mongoose_1.default.model("DataModel", dataSchema);
