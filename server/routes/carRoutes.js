import express from 'express';
import Car from '../models/Car.model.js';
import Driver from '../models/Driver.model.js';

const router = express.Router();

// Route to register a new car
router.post('/register', async (req, res) => {
  try {
    const { name, type, image, plateNo } = req.body;

    const newCar = new Car({
      name,
      type,
      image,
      plateNo,
    });

    await newCar.save();

    res.status(201).json({ message: 'Car registered successfully!', car: newCar });
  } catch (err) {
    res.status(500).json({ message: 'Failed to register car', error: err.message });
  }
});

// Route to fetch all cars
router.get('/', async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch cars', error: err.message });
  }
});

// Route to fetch a car by its ID
router.get('/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// routes/carRoutes.js
router.post('/rent/:id', async (req, res) => {
    const { id } = req.params;
    const { driverId, startTime, endTime } = req.body;
  
    try {
      // Check if the driver already has an active rental
      const existingRental = await Car.findOne({ rentedBy: driverId, isRented: true });
      if (existingRental) {
        return res.status(400).json({ message: 'Driver already has an active rental' });
      }
  
      const car = await Car.findById(id);
  
      if (!car) {
        return res.status(404).json({ message: 'Car not found' });
      }
  
      if (car.isRented) {
        return res.status(400).json({ message: 'Car is already rented' });
      }
  
      car.isRented = true;
      car.rentedBy = driverId;
      car.rentStartTime = new Date(startTime);
      car.rentEndTime = new Date(endTime);
  
      await car.save();
  
      res.status(200).json({ message: 'Car rented successfully', car });
    } catch (err) {
      console.error('Error in renting car:', err);
      res.status(500).json({ message: 'Failed to rent car', error: err.message });
    }
  });
  
  
  router.get('/rented/:driverId', async (req, res) => {
    const { driverId } = req.params;
    try {
      const rentedCars = await Car.find({ rentedBy: driverId });
      res.status(200).json(rentedCars);
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch rented cars', error: err.message });
    }
  });

  // routes/carRoutes.js

router.put('/return/:carId', async (req, res) => {
    const { carId } = req.params;
    try {
      const car = await Car.findById(carId);
  
      if (!car) {
        return res.status(404).json({ message: 'Car not found' });
      }
  
      car.isRented = false;
      car.rentedBy = null; // Clear the rentedBy field
      car.startTime = null;
      car.endTime = null;
  
      await car.save();
  
      res.status(200).json({ message: 'Car returned successfully', car });
    } catch (err) {
      res.status(500).json({ message: 'Failed to return car', error: err.message });
    }
  });
  
  router.put('/revoke/:carId', async (req, res) => {
    const { carId } = req.params;
    try {
      const car = await Car.findById(carId);
  
      if (!car) {
        return res.status(404).json({ message: 'Car not found' });
      }
  
      car.isRented = false;
      car.rentedBy = null; // Clear the rentedBy field
      car.rentStartTime = null;
      car.rentEndTime = null;
  
      await car.save();
  
      res.status(200).json({ message: 'Car rental revoked successfully', car });
    } catch (err) {
      res.status(500).json({ message: 'Failed to revoke car rental', error: err.message });
    }
  });
  
// Fetch all cars with populated rentedBy field
router.get('/cars', async (req, res) => {
    try {
      const cars = await Car.find();
      res.status(200).json(cars);
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch cars', error: err.message });
    }
  });
  
  // Route to fetch available cars (not rented)

// routes/carRoutes.js

router.get('/available', async (req, res) => {
    try {
      // Find all cars where isRented is false (i.e., available)
      const availableCars = await Car.find({ isRented: false });
      res.status(200).json(availableCars);
    } catch (err) {
      console.error('Error fetching available cars:', err);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  });
  
  
  
  
  
  

export default router;
