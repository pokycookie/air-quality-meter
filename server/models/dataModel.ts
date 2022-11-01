import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
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
  updated: {
    type: Date,
    required: true,
  },
});

export default mongoose.model("DataModel", dataSchema);
