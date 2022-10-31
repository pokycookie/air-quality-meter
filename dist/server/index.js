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
const path_1 = __importDefault(require("path"));
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
// Express
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// Development vs Production
if (process.env.NODE_ENV === "production") {
    app.use(express_1.default.static("build"));
}
else {
    app.use((0, cors_1.default)());
}
// Homepage
app.get("/", (req, res) => {
    if (process.env.NODE_ENV === "production") {
        res.sendFile(path_1.default.resolve(__dirname, "../../", "build", "index.html"));
    }
    else {
        res.json("homepage");
    }
});
// API Route
// Upload data
app.post("/api/data", (req, res) => {
    if (req.body) {
        const body = req.body;
        console.log(body);
        res.status(200);
        // const newData = new DataModel(body);
        // newData
        //   .save()
        //   .then(() => {
        //     console.log(`${new Date()}: Data uploaded`);
        //     res.status(200);
        //   })
        //   .catch((err) => {
        //     console.error(err);
        //     res.status(400);
        //   });
    }
    else {
        res.status(400);
    }
});
// Get data
app.get("/api/data", (req, res) => {
    dataModel_1.default.find()
        .then((result) => res.status(200).json(result))
        .catch((err) => {
        console.error(err);
        res.status(400);
    });
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});
