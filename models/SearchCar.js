const mongoose = require('mongoose');

const searchCarSchema = new mongoose.Schema({
  carId: {
    type: String,
    required: true,
    unique: true
  },
  carName: {
    type: String,
    required: true
  },
  pickUpLocation: {
    type: String,
    required: true,
    enum: ['Mumbai', 'Chennai', 'Hyderabad', 'Udupi', 'Bengaluru']
  },
  carImage: {
    type: String,
    required: true
  },
  carCategory: {
    type: String,
    required: true,
    enum: ['Economy', 'SUV', 'Luxury', 'Convertible']
  },
  pricePerDay: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  available: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Update updatedAt timestamp on any update
searchCarSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('SearchCar', searchCarSchema, 'Search-Car');
