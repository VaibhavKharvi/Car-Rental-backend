// Script to backfill missing carId fields in UserActivity collection
const mongoose = require('mongoose');
const UserActivity = require('../models/UserActivity');
const SearchCar = require('../models/SearchCar');

async function fixUserActivityCarIds() {
  try {
    await mongoose.connect('mongodb+srv://chetanshetty06:1234@crs.wiomqmu.mongodb.net/DriveSeva?retryWrites=true&w=majority');
    console.log('Connected to MongoDB');

    // Find all bookings missing a valid carId (or where carId is not a valid SCxxx string)
    const bookings = await UserActivity.find({
      $or: [
        { carId: { $exists: false } },
        { carId: null },
        { carId: { $not: /^SC\d{3}$/ } }
      ]
    });

    let updatedCount = 0;
    for (const booking of bookings) {
      // Try to find the car by carName, pickUpLocation, and pricePerDay (as fallback)
      const car = await SearchCar.findOne({
        carName: booking.carName,
        pickUpLocation: booking.pickUpLocation,
        pricePerDay: booking.pricePerDay
      });
      if (car && car.carId) {
        await UserActivity.updateOne(
          { _id: booking._id },
          { $set: { carId: car.carId } }
        );
        updatedCount++;
        console.log(`Updated booking ${booking.bookingId} with carId ${car.carId}`);
      } else {
        console.warn(`Could not find car for booking ${booking.bookingId}`);
      }
    }
    console.log(`Updated ${updatedCount} bookings with carId.`);
    await mongoose.disconnect();
  } catch (err) {
    console.error('Error updating UserActivity carIds:', err);
    process.exit(1);
  }
}

fixUserActivityCarIds();
