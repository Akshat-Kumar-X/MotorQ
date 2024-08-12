// routes/carRoutes.js

import express from 'express';
import Car from '../models/Car.model.js';

const router = express.Router();

// Route to register a new car
router.post('/register', async (req, res) => {
  try {
    const { name, type, image } = req.body;

    const newCar = new Car({
      name,
      type,
      image,
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

export default router;
