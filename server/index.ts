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

// Homepage
app.get("/", (req, res) => {
  if (process.env.NODE_ENV === "production") {
    res.sendFile(path.resolve(__dirname, "../../", "build", "index.html"));
  } else {
    res.json("homepage");
  }
});

// API Route
// Upload data
app.post("/api/data", (req, res) => {
  if (req.body) {
    const body: string = req.body.uno;
    console.log(req.body);
    console.log(req.body.uno);
    res.status(200).json("OK");
    // const bodyArr = body.split(" ");
    // if (bodyArr[0] !== "UNO" || bodyArr.length < 7) res.status(400).json("Bad Request");

    // const newData = new DataModel({
    //   pm10: parseFloat(bodyArr[1]),
    //   pm25: parseFloat(bodyArr[2]),
    //   pm100: parseFloat(bodyArr[3]),
    //   form: parseFloat(bodyArr[4]),
    //   temp: parseFloat(bodyArr[5]),
    //   humi: parseFloat(bodyArr[6]),
    //   updated: new Date(),
    // });
    // newData
    //   .save()
    //   .then(() => {
    //     console.log(`${new Date()}: Data uploaded`);
    //     res.status(200).json("OK");
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //     res.status(400).json("Bad Request");
    //   });
  } else {
    res.status(400).json("Bad Request");
  }
});

// Get data
app.get("/api/data", (req, res) => {
  DataModel.find()
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
