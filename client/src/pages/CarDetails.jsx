import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import BASE_URL from "../constants";

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isRenting, setIsRenting] = useState(false);
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/cars/${id}`);
        setCar(response.data);
      } catch (error) {
        toast.error("Error fetching car details.");
        console.error("Error fetching car details:", error);
      }
    };

    fetchCarDetails();
  }, [id]);

  const handleRent = async () => {
    setIsRenting(true);
    const rentToast = toast.loading("Renting car...");
    try {
      const driverId = JSON.parse(localStorage.getItem("user"))._id;
      const response = await axios.post(`${BASE_URL}/api/cars/rent/${id}`, {
        driverId,
        plateNo: car.plateNo,
        startTime,
        endTime,
      });
      setCar(response.data.car);
      toast.dismiss(rentToast);
      toast.success("Car rented successfully!");
    } catch (error) {
      toast.dismiss(rentToast);

      if (error.response) {
        console.error("Error response data:", error.response.data);

        if (
          error.response.status === 400 &&
          error.response.data.message === "Driver already has an active rental"
        ) {
          toast.error("You have already rented a car!");
        } else {
          toast.error("Failed to rent the car. Please try again later.");
        }
      } else {
        console.error("Error renting car:", error);
        toast.error("Failed to rent the car. Please try again later.");
      }
    } finally {
      setIsRenting(false);
    }
  };

  if (!car) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="flex gap-2">
          <div>
            <img
              className="w-[700px] h-full object-cover rounded-lg mb-4"
              src={car.image}
              alt={car.name}
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-4">{car.name}</h1>
            <p className="text-gray-700 text-lg">Type: {car.type}</p>
            <p className="text-gray-700 text-lg">Number Plate: {car.plateNo}</p>
            <p
              className={`text-lg font-bold mt-4 ${
                car.isRented ? "text-red-500" : "text-green-500"
              }`}
            >
              Status: {car.isRented ? "Rented" : "Available"}
            </p>

            {!car.isRented && (
              <div className="mt-6">
                <h2 className="text-2xl font-semibold mb-2">Rent this Car</h2>
                <label className="block text-gray-700 mb-2">Start Time</label>
                <input
                  type="datetime-local"
                  className="w-full p-2 border rounded mb-4"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                />
                <label className="block text-gray-700 mb-2">End Time</label>
                <input
                  type="datetime-local"
                  className="w-full p-2 border rounded mb-4"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                />
                <button
                  className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-150"
                  onClick={handleRent}
                  disabled={isRenting}
                >
                  {isRenting ? "Renting..." : "Rent Car"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
