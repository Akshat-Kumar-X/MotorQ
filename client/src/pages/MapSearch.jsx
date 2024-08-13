import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import L from 'leaflet';
import BASE_URL from "../constants";

// Custom icon for the marker
const customIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Component to move the map to the searched location
const MoveMapToLocation = ({ position }) => {
  const map = useMap();
  map.setView(position, 13); // Set the map view to the new position with zoom level 13
  return null;
};

const MapSearch = () => {
  const [drivers, setDrivers] = useState([]);
  const [position, setPosition] = useState([51.505, -0.09]); // Default position (London)
  const [selectedDriver, setSelectedDriver] = useState(''); // Selected driver name
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/drivers`);
        setDrivers(response.data);
      } catch (error) {
        console.error('Error fetching drivers:', error);
        setError('Failed to load drivers.');
      }
    };

    fetchDrivers();
  }, []);

  const handleSearch = async () => {
    if (!selectedDriver) {
      setError('Please select a driver to search.');
      return;
    }

    const driver = drivers.find(d => d.name === selectedDriver);
    if (!driver) {
      setError('Driver not found. Please select a valid driver.');
      return;
    }

    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(driver.location)}&format=json&limit=1`
      );

      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        setPosition([parseFloat(lat), parseFloat(lon)]);
        setError(''); // Clear any previous errors
      } else {
        setError('Location not found. Please try a different query.');
      }
    } catch (error) {
      console.error('Error fetching location:', error);
      setError('There was an error with the search. Please try again.');
    }
  };

  return (
    <div className='p-10' >
      <div className="mb-4 flex justify-center">
        <select
          value={selectedDriver}
          onChange={(e) => setSelectedDriver(e.target.value)}
          className="px-4 py-2 border rounded-md w-[300px]"
        >
          <option value="" disabled>Select a driver</option>
          {drivers.map(driver => (
            <option key={driver._id} value={driver.name}>
              {driver.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded-md "
        >
          Search
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <MapContainer
        center={position}
        zoom={13}
        style={{ height: '400px', width: '80%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position} icon={customIcon}>
          <Popup>
            A marker at the searched location.
          </Popup>
        </Marker>
        {/* Automatically move the map to the new position */}
        <MoveMapToLocation position={position} />
      </MapContainer>
    </div>
  );
};

export default MapSearch;
