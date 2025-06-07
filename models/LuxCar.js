const mongoose = require('mongoose');

const luxCarSchema = new mongoose.Schema({
  carId: {
    type: String,
    required: true,
    unique: true
  },
  carName: {
    type: String,
    required: true
  },
  carImage: {
    type: String,
    required: true
  },
  carCategory: {
    type: String,
    enum: ['Luxury'],
    default: 'Luxury'
  },
  pricePerDay: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const LuxCar = mongoose.model('LuxCar', luxCarSchema);
module.exports = LuxCar;
