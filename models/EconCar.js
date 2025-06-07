const mongoose = require('mongoose');

const econCarSchema = new mongoose.Schema({
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
    enum: ['Economy'],
    default: 'Economy'
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

const EconCar = mongoose.model('EconCar', econCarSchema);
module.exports = EconCar;
