"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const dataModel_1 = __importDefault(require("./models/dataModel"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// MongoDB
try {
    mongoose_1.default.connect(process.env.DB_URI || "");
    mongoose_1.default.connection.once("open", () => {
        console.log("MongoDB is connected");
    });
}
catch (error) {
    console.log(`mongoDB error: ${error}`);
}
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
app.get("/", (req, res) => {
    res.json("homepage");
});
// API Route
app.post("/api/upload", (req, res) => {
    // upload data
    if (req.body) {
        const body = req.body;
        const newData = new dataModel_1.default(body);
        newData
            .save()
            .then(() => {
            console.log("uploaded");
        })
            .catch((err) => {
            console.error(err);
            res.status(400).json(err);
        });
    }
    else {
        res.status(400);
    }
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});
