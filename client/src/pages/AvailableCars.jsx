import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_URL from '../constants';

const AvailableCars = () => {
  const [availableCars, setAvailableCars] = useState([]);

  useEffect(() => {
    const fetchAvailableCars = async () => {
      try {
        // Fetch all cars
        const response = await axios.get(`${BASE_URL}/api/cars`);
        const allCars = response.data;

        // Filter to get only available cars (not rented)
        const filteredCars = allCars.filter(car => !car.isRented);

        // Set available cars in state
        setAvailableCars(filteredCars);
      } catch (error) {
        console.error('Error fetching available cars:', error);
      }
    };

    fetchAvailableCars();
  }, []);

  return (
    <div className="max-w-7xl mx-auto md:px-9 px-5 mb-16">
      <h1 className="text-3xl font-bold text-center my-8">Available Cars</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {availableCars.length === 0 ? (
          <p className="text-center text-xl">No available cars found.</p>
        ) : (
          availableCars.map(car => (
            <div key={car._id} className="border p-4 rounded-lg shadow">
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-48 object-cover rounded-md"
              />
              <h2 className="text-2xl font-semibold mt-4">{car.name}</h2>
              <p className="text-gray-600">Type: {car.type}</p>
              <p className="text-gray-600">Plate Number: {car.plateNo}</p>
              <p className="text-green-500 font-semibold">Available</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AvailableCars;
