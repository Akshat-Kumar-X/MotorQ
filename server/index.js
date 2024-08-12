import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

import DriverModel from './models/Driver.model.js';
import StudentModel from './models/Student.model.js';
import AppointmentModel from './models/Appointment.model.js';
import carRoutes from './routes/carRoutes.js';
dotenv.config();
//   https://edumate-tutor.vercel.app
const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['POST', 'GET', 'PUT', 'DELETE'],
  credentials: true
}));

app.use('/api/cars', carRoutes);

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Database Connected.');
  } catch (err) {
    console.log('Database connection error:', err.message);
    process.exit(1); // Exit process with failure
  }
};

connectToDatabase();

// Profile update route
app.post('/api/profile', async (req, res) => {
  const { name, email, password, subject, experience, location, contact, image, description } = req.body;
  try {
    const user = await DriverModel.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
      user.name = name;
      user.subject = subject;
      user.experience = experience;
      user.location = location;
      user.contact = contact;
      user.description = description;
      user.image = image;

      await user.save();
      res.json({ message: "Update successful", user });
    } else {
      res.json({ message: "Incorrect password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Update failed", error: error.message });
  }
});

// Teacher registration endpoint
app.post('/api/teacher-register', async (req, res) => {
  try {
    const { email, password, name, experience, location, contact, description, image } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const teacher = await DriverModel.create({
      email,
      password: hashedPassword,
      name,
      experience,
      location,
      contact,
      description,
      image,
    });
    res.status(201).json(teacher);
  } catch (error) {
    res.status(400).json({ message: 'User not created', error: error.message });
  }
});

// Teacher login endpoint
app.post('/api/teacher-login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await DriverModel.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
      res.json({ message: "Login successful", 
        user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        experience: user.experience,
        location: user.location,
        contact: user.contact,
        type: 'teacher',
        description: user.description,
        image: user.image,
      }});
    } else {
      res.json({ message: "Wrong email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
});

// Student registration endpoint
app.post('/api/student-register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const student = await StudentModel.create({ email, password: hashedPassword, name });
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ message: 'User not created', error: error.message });
  }
});

// Student login endpoint
app.post('/api/student-login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await StudentModel.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
      res.json({ message: "Login successful", 
        user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        type: 'student',
      }});
    } else {
      res.json({ message: "Wrong email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
});

// Schedule appointment endpoint
app.post('/api/appointments', async (req, res) => {
  const { studentId, teacherId, date, time } = req.body;
  try {
    const appointment = await AppointmentModel.create({
      studentId,
      teacherId,
      date,
      time
    });
    res.status(201).json(appointment);
  } catch (error) {
    res.status(400).json({ message: 'Appointment not created', error: error.message });
  }
});

app.get('/api/my-appointments', async (req, res) => {
  const { studentId, teacherId } = req.query;

  try {
    let appointments;
    if (studentId) {
      appointments = await AppointmentModel.find({ studentId }).populate('teacherId');
    } else if (teacherId) {
      appointments = await AppointmentModel.find({ teacherId }).populate('studentId');
    } else {
      return res.status(400).json({ message: 'Student ID or Teacher ID is required' });
    }

    console.log('Fetched appointments:', appointments);  // Log fetched appointments
    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error.message);  // Log error details
    res.status(500).json({ message: 'Could not fetch appointments', error: error.message });
  }
});

app.put('/api/update-appointment-status', async (req, res) => {
  const { appointmentId, status } = req.body;

  if (!appointmentId || !status) {
    return res.status(400).json({ message: 'Appointment ID and status are required' });
  }

  try {
    const appointment = await AppointmentModel.findByIdAndUpdate(
      appointmentId,
      { status },
      { new: true }
    );
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json(appointment);
  } catch (error) {
    console.error('Error updating appointment status:', error.message);
    res.status(500).json({ message: 'Could not update appointment status', error: error.message });
  }
});

app.get('/api/teachers', async (req, res) => {
  try {
    const teachers = await DriverModel.find({});
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching teachers', error: error.message });
  }
});

app.get('/api/teacher-profile/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const teacher = await DriverModel.findById(id);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.json(teacher);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching teacher profile', error: error.message });
  }
});

app.use('/', (req, res) => {
  res.json({message : "Running"});
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}.`);
});
