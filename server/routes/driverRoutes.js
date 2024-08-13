// Import necessary modules
import express from "express";
import DriverModel from "../models/Driver.model.js"; // Adjust the path based on your project structure

const router = express.Router();

// Route to get driver details by ID
router.get("/driver/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const driver = await DriverModel.findById(id);

    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    // Return only the necessary driver information
    res.status(200).json({ name: driver.name });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching driver details", error: error.message });
  }
});

export default router;
