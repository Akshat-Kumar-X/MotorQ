import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import BASE_URL from '../../constants'; // Update with your actual constants

const CarRegister = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result); // This will store the base64 encoded image
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loadingToast = toast.loading('Registering car...');

    try {
      await axios.post(`${BASE_URL}/api/cars/register`, {
        name,
        type,
        image,
      });

      toast.dismiss(loadingToast);
      toast.success('Car registered successfully!');
      setName('');
      setType('');
      setImage(null);
    } catch (err) {
      toast.dismiss(loadingToast);
      console.error(err.message);
      toast.error('Failed to register car');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-10">
      <h1 className="text-3xl font-semibold mb-5">Car Register</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Car Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Enter car name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Car Type</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Enter car type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Car Image</label>
          <input
            type="file"
            accept="image/*"
            className="w-full p-2 border rounded"
            onChange={handleImageChange}
            required
          />
        </div>
        {image && (
          <div className="mb-4">
            <img src={image} alt="Car preview" className="w-full h-auto rounded" />
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-150"
        >
          Register Car
        </button>
      </form>
    </div>
  );
};

export default CarRegister;
