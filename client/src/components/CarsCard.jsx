import React from "react";
import { useNavigate } from "react-router-dom";

const CarsCard = ({ _id, name, type, image, plateNo, isRented }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/cars/${_id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className={`max-w-sm rounded overflow-hidden shadow-lg m-4 cursor-pointer p-2 hover:scale-105 duration-300 ${
        isRented ? "bg-gray-300 " : "bg-white"
      }`}
    >
      <img
        className={`w-full h-48 object-cover ${isRented ? "opacity-50" : ""}`}
        src={image}
        alt={name}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base">Type: {type}</p>
        <p className="text-gray-700 text-base">Number Plate: {plateNo}</p>
        {isRented && (
          <p className="text-red-500 text-lg font-semibold mt-2">Rented</p>
        )}
      </div>
    </div>
  );
};

export default CarsCard;
