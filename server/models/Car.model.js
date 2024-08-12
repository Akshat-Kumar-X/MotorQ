import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  plateNo: {
    type: String,
    required: true,
  },
  isRented: {
    type: Boolean,
    default: false,
  },
  rentedBy: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Drivers'
  },
  rentStartTime: {
    type: Date,
  },
  rentEndTime: {
    type: Date,
  },
});

const Car = mongoose.model('Car', carSchema);

export default Car;
