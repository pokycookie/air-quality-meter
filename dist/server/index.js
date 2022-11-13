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
const odata_1 = __importDefault(require("./odata"));
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
        try {
            console.log(body);
            console.log(typeof body.pm10);
            const newData = new dataModel_1.default({
                pm10: body.pm10.toFixed(2),
                pm25: body.pm25.toFixed(2),
                pm100: body.pm100.toFixed(2),
                form: body.form.toFixed(2),
                temp: body.temp.toFixed(2),
                humi: body.humi.toFixed(2),
                updated: new Date(),
            });
            newData
                .save()
                .then(() => {
                console.log(`${new Date()}: ${newData}`);
                res.status(200).json("OK");
            })
                .catch((err) => {
                console.error(err);
                res.status(400).json("Bad Request");
            });
        }
        catch (err) {
            console.error(err);
            res.status(400).json("Bad Request");
        }
    }
    else {
        res.status(400).json("Bad Request");
    }
});
// Get data
app.get("/api/data", (req, res) => {
    const query = req.query;
    dataModel_1.default.find((0, odata_1.default)(query).filter)
        .sort((0, odata_1.default)(query).sort)
        .then((result) => res.status(200).json(result))
        .catch((err) => {
        console.error(err);
        res.status(400).json(err);
    });
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});
