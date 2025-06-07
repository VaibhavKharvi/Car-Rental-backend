const mongoose = require('mongoose');

const userActivitySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    ref: 'User' // Reference to User collection
  },
  bookingId: {
    type: String,
    required: true,
    unique: true
  },
  carName: {
    type: String,
    required: true
  },
  carCategory: {
    type: String,
    required: true
  },
  // carId should always match the _id from Search-Car collection
  carId: {
    type: String,
    required: true
  },
  pricePerDay: {
    type: Number,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  numberOfDays: {
    type: Number,
    required: true
  },
  pickUpLocation: {
    type: String,
    required: true
  },
  returnLocation: {
    type: String,
    required: true
  },
  paymentId: {
    type: String,
    required: true
  },
  paymentDate: {
    type: Date,
    default: null,
    required: false
  },
  totalAmount: {
    type: Number,
    required: true
  },
  bookingStatus: {
    type: String,
    required: true,
    enum: ['pending', 'confirmed', 'completed', 'cancelled']
  },
  paymentStatus: {
    type: String,
    required: true,
    enum: ['pending', 'paid', 'failed', 'refunded']
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
userActivitySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('UserActivity', userActivitySchema, 'User-Activity');
