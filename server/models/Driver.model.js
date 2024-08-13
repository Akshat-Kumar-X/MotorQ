import mongoose from "mongoose";

const DriverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  experience: {
    type: Number,
  },
  location: {
    type: String,
  },
  contact: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
});

const DriverModel = mongoose.model("Drivers", DriverSchema);
export default DriverModel;
