const express = require('express');
const router = express.Router();
const UserActivity = require('../../models/UserActivity');
const { v4: uuidv4 } = require('uuid');

// Get all bookings (for admin dashboard)
router.get('/', async (req, res) => {
  try {
    const bookings = await UserActivity.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch bookings', error: err.message });
  }
});

// Get bookings for a specific user (for user dashboard)
router.get('/user/:userId', async (req, res) => {
  try {
    const bookings = await UserActivity.find({ userId: req.params.userId });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch user bookings', error: err.message });
  }
});

// Get booking by bookingId (with carImage from respective collection)
router.get('/user-activity/:bookingId', async (req, res) => {
  try {
    const booking = await UserActivity.findOne({ bookingId: req.params.bookingId });
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    let carImage = null;
    const carId = booking.carId;
    const carCategory = booking.carCategory;
    let carDoc = null;
    try {
      if (carCategory === 'Economy') {
        carDoc = await require('../../models/EconCar').findOne({ carId });
      } else if (carCategory === 'SUV') {
        carDoc = await require('../../models/SuvCar').findOne({ carId });
      } else if (carCategory === 'Luxury') {
        carDoc = await require('../../models/LuxCar').findOne({ carId });
      } else if (carCategory === 'Convertible') {
        carDoc = await require('../../models/ConvCar').findOne({ carId });
      }
      if (carDoc && carDoc.carImage) {
        carImage = carDoc.carImage;
      } else {
        // Fallback to SearchCar
        const SearchCar = require('../../models/SearchCar');
        const searchDoc = await SearchCar.findOne({ carId });
        carImage = searchDoc ? searchDoc.carImage : null;
      }
    } catch (e) {
      // Fallback to SearchCar on error
      const SearchCar = require('../../models/SearchCar');
      const searchDoc = await SearchCar.findOne({ carId });
      carImage = searchDoc ? searchDoc.carImage : null;
    }
    res.json({ ...booking.toObject(), carImage });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch booking', error: err.message });
  }
});

// Create booking from frontend (Search Results Rent Now)
router.post('/', async (req, res) => {
  try {
    const {
      userId,
      carId, // This is the car's _id from the frontend
      carName,
      carCategory,
      pricePerDay,
      pickUpLocation,
      returnLocation,
      duration,
      numberOfDays,
      totalAmount
    } = req.body;

    // Validate required fields
    if (!userId || !carId || !carName || !carCategory || !pricePerDay || !pickUpLocation || !returnLocation || !duration || !numberOfDays || !totalAmount) {
      return res.status(400).json({ success: false, message: 'Missing required fields for booking creation' });
    }

    // Fetch the car from SearchCar using _id and get its carId field
    const SearchCar = require('../../models/SearchCar');
    const carDoc = await SearchCar.findById(carId);
    if (!carDoc) {
      return res.status(404).json({ success: false, message: 'Car not found' });
    }
    const actualCarId = carDoc.carId;

    // Generate unique bookingId
    const bookingId = 'BID-' + uuidv4().slice(0, 8).toUpperCase();

    // Compose booking document with all required fields
    const booking = new UserActivity({
      userId,
      bookingId,
      carId: actualCarId, // The unique carId from SearchCar
      carName,
      carCategory,
      pricePerDay: parseInt(pricePerDay),
      duration,
      numberOfDays: parseInt(numberOfDays),
      pickUpLocation,
      returnLocation,
      paymentId: '-',
      paymentDate: null,
      totalAmount: parseInt(totalAmount),
      bookingStatus: 'pending',
      paymentStatus: 'pending',
    });

    await booking.save();
    res.status(201).json({ success: true, booking });
  } catch (err) {
    console.error('Booking creation failed:', err);
    res.status(500).json({ success: false, message: 'Booking creation failed', error: err.message });
  }
});

// Admin: Update booking status and payment status
router.patch('/:bookingId/status', async (req, res) => {
  try {
    const { bookingStatus, paymentStatus } = req.body;
    const update = {};
    if (bookingStatus) update.bookingStatus = bookingStatus;
    if (paymentStatus) update.paymentStatus = paymentStatus;
    const booking = await UserActivity.findOneAndUpdate(
      { bookingId: req.params.bookingId },
      { $set: update },
      { new: true }
    );
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
    res.json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update booking', error: err.message });
  }
});

// Process payment for a booking
router.post('/process-payment', async (req, res) => {
  try {
    const { bookingId } = req.body;
    
    // 1. Find the booking
    const booking = await UserActivity.findOne({ bookingId });
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    
    // 2. Generate a fake transaction ID (for demo)
    const transactionId = `DEMO_${Date.now()}`;
    
    // 3. Update the booking with payment details
    booking.paymentId = transactionId;
    booking.paymentDate = new Date();
    booking.paymentStatus = 'paid';
    booking.bookingStatus = 'confirmed';
    
    await booking.save();
    
    // 4. Return success response
    res.json({ 
      success: true, 
      transactionId,
      bookingId: booking.bookingId,
      amount: booking.totalAmount,
      message: 'Payment processed successfully' 
    });
    
  } catch (err) {
    console.error('Payment processing error:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Payment processing failed',
      error: err.message 
    });
  }
});

module.exports = router;
