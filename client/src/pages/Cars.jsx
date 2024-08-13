import React, { useEffect, useState } from "react";
import CarsCard from "../components/CarsCard";
import axios from "axios";
import BASE_URL from "../constants";

const Cars = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/cars`);
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchCars();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <h1 className="text-4xl text-center font-bold mb-8">Cars</h1>
      <div className="flex flex-wrap justify-center">
        {cars.length > 0 ? (
          cars.map((car) => (
            <CarsCard
              key={car._id}
              _id={car._id} // Pass the car ID here
              name={car.name}
              type={car.type}
              image={car.image}
              plateNo={car.plateNo}
              isRented={car.isRented} // Pass the isRented status
            />
          ))
        ) : (
          <p className="text-center text-xl">No cars available</p>
        )}
      </div>
    </div>
  );
};

export default Cars;
