import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  managerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Managers",
    required: true,
  },
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Drivers",
    required: true,
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Car",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected", "inActive"],
    default: "pending",
  },
  isActive: { type: Boolean, default: true },
});

const AppointmentModel = mongoose.model("Appointment", appointmentSchema);

export default AppointmentModel;
