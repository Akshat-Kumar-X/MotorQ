import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

import DriverModel from "./models/Driver.model.js";
import ManagerModel from "./models/Manager.model.js";
import AppointmentModel from "./models/Appointment.model.js";
import carRoutes from "./routes/carRoutes.js";
import driverRoutes from "./routes/driverRoutes.js";
dotenv.config();
//   https://edumate-tutor.vercel.app http://localhost:5173
const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(
  cors({
    origin: "http://motor-q-app.vercel.app",
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api/cars", carRoutes);
app.use("/api", driverRoutes);

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database Connected.");
  } catch (err) {
    console.log("Database connection error:", err.message);
    process.exit(1); // Exit process with failure
  }
};

connectToDatabase();

// Profile update route
app.post("/api/profile", async (req, res) => {
  const {
    name,
    email,
    password,
    subject,
    experience,
    location,
    contact,
    image,
    description,
  } = req.body;
  try {
    const user = await DriverModel.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      user.name = name;
      user.subject = subject;
      user.experience = experience;
      user.location = location;
      user.contact = contact;
      user.description = description;
      user.image = image;

      await user.save();
      res.json({ message: "Update successful", user });
    } else {
      res.json({ message: "Incorrect password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Update failed", error: error.message });
  }
});

// Driver registration endpoint
app.post("/api/driver-register", async (req, res) => {
  try {
    const {
      email,
      password,
      name,
      experience,
      location,
      contact,
      description,
      image,
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const driver = await DriverModel.create({
      email,
      password: hashedPassword,
      name,
      experience,
      location,
      contact,
      description,
      image,
    });
    res.status(201).json(driver);
  } catch (error) {
    res.status(400).json({ message: "User not created", error: error.message });
  }
});

// Driver login endpoint
app.post("/api/driver-login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await DriverModel.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        message: "Login successful",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          experience: user.experience,
          location: user.location,
          contact: user.contact,
          type: "driver",
          description: user.description,
          image: user.image,
        },
      });
    } else {
      res.json({ message: "Wrong email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
});

// Manager registration endpoint
app.post("/api/manager-register", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const manager = await ManagerModel.create({
      email,
      password: hashedPassword,
      name,
    });
    res.status(201).json(manager);
  } catch (error) {
    res.status(400).json({ message: "User not created", error: error.message });
  }
});

// Manager login endpoint
app.post("/api/manager-login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await ManagerModel.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        message: "Login successful",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          type: "manager",
        },
      });
    } else {
      res.json({ message: "Wrong email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
});

// Schedule appointment endpoint
app.post("/api/appointments", async (req, res) => {
  const { managerId, driverId, startDate, endDate, vehicleId } = req.body;
  try {
    if (!managerId || !driverId || !startDate || !endDate || !vehicleId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const appointment = await AppointmentModel.create({
      managerId,
      driverId,
      startDate,
      endDate,
      vehicleId,
      status: "pending",
      isActive: true,
    });
    res.status(201).json(appointment);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Appointment not created", error: error.message });
  }
});

app.get("/api/my-appointments", async (req, res) => {
  const { managerId, driverId } = req.query;

  try {
    let appointments;
    if (managerId) {
      appointments = await AppointmentModel.find({ managerId })
        .populate("driverId")
        .populate("vehicleId"); // Populate vehicle details
    } else if (driverId) {
      appointments = await AppointmentModel.find({ driverId })
        .populate("managerId")
        .populate("vehicleId"); // Populate vehicle details
    } else {
      return res
        .status(400)
        .json({ message: "Manager ID or Driver ID is required" });
    }

    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error.message);
    res
      .status(500)
      .json({ message: "Could not fetch appointments", error: error.message });
  }
});

app.put("/api/update-appointment-status", async (req, res) => {
  const { appointmentId, status } = req.body;

  if (!appointmentId || !status) {
    return res
      .status(400)
      .json({ message: "Appointment ID and status are required" });
  }

  try {
    // Find the appointment to be updated
    const appointment = await AppointmentModel.findById(appointmentId).populate(
      "vehicleId"
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (!appointment.isActive && status === "accepted") {
      return res
        .status(400)
        .json({ message: "This appointment is no longer active" });
    }

    // If the appointment is accepted, invalidate all other pending appointments for the same manager
    if (status === "accepted") {
      await AppointmentModel.updateMany(
        { managerId: appointment.managerId, status: "pending", isActive: true },
        { status: "inActive", isActive: false }
      );

      // Mark the car as rented
      const vehicle = appointment.vehicleId;
      vehicle.isRented = true;
      vehicle.rentedBy = appointment.driverId;
      vehicle.rentStartTime = appointment.startDate;
      vehicle.rentEndTime = appointment.endDate;
      await vehicle.save();
    }

    // Update the status of the current appointment
    appointment.status = status;
    appointment.isActive = status === "accepted"; // Only the accepted appointment remains active
    await appointment.save();

    res.status(200).json(appointment);
  } catch (error) {
    console.error("Error updating appointment status:", error.message);
    res
      .status(500)
      .json({
        message: "Could not update appointment status",
        error: error.message,
      });
  }
});

app.get("/api/drivers", async (req, res) => {
  try {
    const drivers = await DriverModel.find({});
    res.json(drivers);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching drivers", error: error.message });
  }
});

app.get("/api/driver-profile/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const driver = await DriverModel.findById(id);
    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }
    res.json(driver);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching driver profile", error: error.message });
  }
});

app.use("/", (req, res) => {
  res.json({ message: "Running" });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}.`);
});
