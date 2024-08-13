import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import BASE_URL from "../constants";
import defaultImage from "/assets/profile.jpg";

const AllCars = () => {
  const [cars, setCars] = useState([]);
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/cars`);
        const carsData = response.data;

        // Fetch driver details for rented cars
        const carsWithDriverDetails = await Promise.all(
          carsData.map(async (car) => {
            if (car.rentedBy) {
              try {
                const driverResponse = await axios.get(
                  `${BASE_URL}/api/driver/${car.rentedBy}`
                );
                const driverName = driverResponse.data.name;
                return {
                  ...car,
                  rentedBy: { name: driverName },
                };
              } catch (error) {
                console.error("Error fetching driver name:", error);
                return car;
              }
            }
            return car;
          })
        );

        setCars(carsWithDriverDetails);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchCars();
  }, []);

  const handleRevokeRental = async (carId) => {
    const revokeToast = toast.loading("Revoking rental...");
    try {
      await axios.put(`${BASE_URL}/api/cars/revoke/${carId}`);
      toast.dismiss(revokeToast);
      toast.success("Rental revoked successfully!");
      setCars((prevCars) =>
        prevCars.map((car) =>
          car._id === carId
            ? { ...car, isRented: false, rentedBy: null, rentEndTime: null }
            : car
        )
      );
    } catch (error) {
      toast.dismiss(revokeToast);
      console.error("Error revoking rental:", error);
      toast.error("Failed to revoke rental. Please try again later.");
    }
  };

  return (
    <section className="max-w-7xl mx-auto md:px-9 px-5 mb-16">
      <div
        className="relative flex md:justify-center items-center rounded-3xl mt-10 h-[150px] bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://i.ibb.co/p4n1d2p/appointment-banner.png)",
        }}
      >
        <h1 className="md:text-5xl text-3xl font-bold text-white z-10 max-md:ms-10">
          All Cars
        </h1>
      </div>
      <div className="flex-col">
        <h1 className="text-2xl text-[#353452] text-center my-5">
          All Available and Rented Cars
        </h1>

        {cars.length === 0 ? (
          <p className="text-center pb-20 pt-16 text-2xl text-[#353452]">
            No cars found
          </p>
        ) : (
          <div className="flex justify-center">
            <ul className="flex flex-col gap-1 text-[#353452]">
              {cars.map((car) => (
                <li
                  key={car._id}
                  className="mb-4 p-4 px-10 border shadow rounded-lg hover:bg-zinc-100 duration-300"
                >
                  <div className="flex md:items-center md:flex-row flex-col md:gap-10 gap-1 text-xs text-gray-600">
                    <img
                      src={car.image ? car.image : defaultImage}
                      alt="Car"
                      className="h-16 w-16 object-cover rounded-full shadow-xl"
                    />
                    <p className="flex flex-col">
                      Name:{" "}
                      <span className="font-medium text-lg text-[#353452]">
                        {car.name}
                      </span>
                    </p>
                    <p className="flex flex-col">
                      Type:{" "}
                      <span className="font-medium text-lg text-[#353452]">
                        {car.type}
                      </span>
                    </p>
                    <p className="flex flex-col">
                      Status:{" "}
                      <span
                        className={`text-white px-6 py-1 text-base font-medium rounded-full bg-gradient-to-r ${
                          car.isRented
                            ? "from-red-400 to-red-500"
                            : "from-green-400 to-green-500"
                        }`}
                      >
                        {car.isRented ? "Rented" : "Available"}
                      </span>
                    </p>

                    {car.isRented && car.rentedBy && (
                      <>
                        <p className="flex flex-col">
                          Driver:{" "}
                          <span className="font-medium text-lg text-[#353452]">
                            {car.rentedBy.name}
                          </span>
                        </p>
                        <p className="flex flex-col">
                          Return Date:{" "}
                          <span className="font-medium text-lg text-[#353452]">
                            {new Date(car.rentEndTime).toLocaleDateString()}
                          </span>
                        </p>
                        <button
                          className="bg-red-500 text-white p-2 px-5 rounded-md font-semibold mt-4"
                          onClick={() => handleRevokeRental(car._id)}
                        >
                          Revoke Rental
                        </button>
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllCars;
