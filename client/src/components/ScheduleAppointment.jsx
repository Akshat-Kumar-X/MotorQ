import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import BASE_URL from "../constants";

const ScheduleAppointmentModal = ({ driverId, closeModal }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [availableCars, setAvailableCars] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState("");

  useEffect(() => {
    const fetchAvailableCars = async () => {
      try {
        const carsResponse = await axios.get(`${BASE_URL}/api/cars`);
        const allCars = carsResponse.data;
        const filteredCars = allCars.filter((car) => !car.isRented);
        setAvailableCars(filteredCars);
      } catch (err) {
        console.error("Error fetching available cars:", err);
      }
    };

    fetchAvailableCars();
  }, []);

  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    const managerId = user ? user._id : null;
    const toastId = toast.loading("Scheduling appointment...");
    
    if (!managerId) {
      toast.error("Please SignIn", { id: toastId });
      return;
    }

    if (user.type === "driver") {
      toast.error("Only Manager can schedule appointments", { id: toastId });
      return;
    }

    try {
      // Check if the driver has already rented a car
      const carCheckResponse = await axios.get(`${BASE_URL}/api/cars`);
      const rentedCar = carCheckResponse.data.find(
        (car) => car.rentedBy === driverId
      );

      if (rentedCar) {
        toast.error("Driver is already scheduled with another task", { id: toastId });
        return;
      }

      // Proceed with scheduling the appointment
      await axios.post(`${BASE_URL}/api/appointments`, {
        managerId,
        driverId,
        startDate,
        endDate,
        vehicleId: selectedVehicle,
      });
      toast.success("Appointment scheduled!", { id: toastId });
      closeModal();
    } catch (error) {
      console.error("Error scheduling appointment:", error.response);
      toast.error(
        error.response?.data?.message || "Failed to schedule appointment.", { id: toastId }
      );
    }
  };

  return (
    <div className="relative inset-0  flex justify-center items-center ">
      <div className="bg-white p-6 rounded-lg max-w-md w-[400px] shadow-2xl border-2 absolute bottom-[-101px] right-[-140px] z-50">
        <h2 className="text-2xl font-bold mb-4">Schedule Appointment</h2>
        <form onSubmit={handleAppointmentSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Start Date & Time</label>
            <input
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">End Date & Time</label>
            <input
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Select Vehicle</label>
            <select
              value={selectedVehicle}
              onChange={(e) => setSelectedVehicle(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              required
            >
              <option value="">Select a vehicle</option>
              {availableCars.map((vehicle) => (
                <option key={vehicle._id} value={vehicle._id}>
                  {vehicle.name} ({vehicle.type})
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-4">
            <button type="button" onClick={closeModal} className="bg-gray-500 text-white p-2 px-5 rounded-md">
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white p-2 px-5 rounded-md">
              Schedule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleAppointmentModal;
