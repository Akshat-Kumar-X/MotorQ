import React from 'react';

const CarsCard = ({ name, type, image }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-4">
      <img className="w-full h-48 object-cover" src={image} alt={name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base">
          Type: {type}
        </p>
      </div>
    </div>
  );
};

export default CarsCard;
