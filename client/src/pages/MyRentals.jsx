import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import BASE_URL from "../constants";

const MyRentals = () => {
  const [rentedCars, setRentedCars] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchRentedCars = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/cars/rented/${user._id}`
        );
        const carsData = response.data;

        // Format the rentEndTime (return date) for each car
        const carsWithFormattedDate = carsData.map((car) => ({
          ...car,
          rentEndTimeFormatted: car.rentEndTime
            ? new Date(car.rentEndTime).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "",
        }));

        console.log("Rented cars fetched:", carsWithFormattedDate);
        setRentedCars(carsWithFormattedDate);
      } catch (error) {
        console.error("Error fetching rented cars:", error);
      }
    };

    fetchRentedCars();
  }, [user._id]);

  const handleReturnCar = async (carId) => {
    const returnToast = toast.loading("Returning car...");
    try {
      await axios.put(`${BASE_URL}/api/cars/return/${carId}`);
      setRentedCars((prevCars) => prevCars.filter((car) => car._id !== carId));
      toast.success("Car returned successfully!", { id: returnToast });
    } catch (error) {
      toast.error("Failed to return the car. Please try again later.", {
        id: returnToast,
      });
      console.error("Error returning car:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <h1 className="text-4xl text-center font-bold mb-8">My Rentals</h1>
      <div className="flex flex-wrap justify-center">
        {rentedCars.length > 0 ? (
          rentedCars.map((car) => (
            <div
              key={car._id}
              className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-4"
            >
              <img
                className="w-full h-48 object-cover"
                src={car.image}
                alt={car.name}
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{car.name}</div>
                <p className="text-gray-700 text-base">Type: {car.type}</p>
                <p className="text-gray-700 text-base">
                  Number Plate: {car.plateNo}
                </p>
                <p className="text-red-500 text-base font-semibold">Rented</p>
                <p className="text-green-500 text-base font-semibold">
                  Return by: {car.rentEndTimeFormatted}
                </p>
                <button
                  className="mt-4 bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-150"
                  onClick={() => handleReturnCar(car._id)}
                >
                  Return Car
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-xl">
            You haven't rented any cars yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyRentals;
