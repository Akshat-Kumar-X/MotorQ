import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Students', required: true },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Drivers', required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
});

const AppointmentModel = mongoose.model('Appointment', appointmentSchema);
export default AppointmentModel;
