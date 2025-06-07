const mongoose = require('mongoose');

const suvCarSchema = new mongoose.Schema({
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
    enum: ['SUV'],
    default: 'SUV'
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

const SuvCar = mongoose.model('SuvCar', suvCarSchema);
module.exports = SuvCar;
