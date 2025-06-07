const mongoose = require('mongoose');

const convCarSchema = new mongoose.Schema({
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
    enum: ['Convertible'],
    default: 'Convertible'
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

const ConvCar = mongoose.model('ConvCar', convCarSchema);
module.exports = ConvCar;
