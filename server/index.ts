import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import DataModel from "./models/dataModel";
import { IData } from "../src/types";
import path from "path";

dotenv.config();
const app = express();

// MongoDB
try {
  mongoose.connect(process.env.DB_URI || "");
  mongoose.connection.once("open", () => {
    console.log("MongoDB is connected");
  });
} catch (error) {
  console.log(`mongoDB error: ${error}`);
}

// Express
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Development vs Production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
} else {
  app.use(cors());
}

app.get("/", (req, res) => {
  if (process.env.NODE_ENV === "production") {
    res.sendFile(path.resolve(__dirname, "../../", "build", "index.html"));
  } else {
    res.json("homepage");
  }
});

// API Route
app.post("/api/upload", (req, res) => {
  // upload data
  if (req.body) {
    const body: IData = req.body;
    const newData = new DataModel(body);
    newData
      .save()
      .then(() => {
        console.log("uploaded");
      })
      .catch((err) => {
        console.error(err);
        res.status(400).json(err);
      });
  } else {
    res.status(400);
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
