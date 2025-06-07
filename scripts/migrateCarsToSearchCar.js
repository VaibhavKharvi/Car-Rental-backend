// Script to migrate all cars from ConvCar, EconCar, LuxCar, SuvCar to SearchCar
const mongoose = require('mongoose');
require('dotenv').config();

const ConvCar = require('../models/ConvCar');
const EconCar = require('../models/EconCar');
const LuxCar = require('../models/LuxCar');
const SuvCar = require('../models/SuvCar');
const SearchCar = require('../models/SearchCar');

async function migrate() {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  const allCars = [];
  allCars.push(...await ConvCar.find());
  allCars.push(...await EconCar.find());
  allCars.push(...await LuxCar.find());
  allCars.push(...await SuvCar.find());

  for (const car of allCars) {
    // Upsert into SearchCar using the same _id
    await SearchCar.findOneAndUpdate(
      { _id: car._id },
      {
        $set: {
          carId: car.carId || car._id.toString(),
          carName: car.carName,
          pickUpLocation: car.pickUpLocation,
          carImage: car.carImage,
          carCategory: car.carCategory,
          pricePerDay: car.pricePerDay,
          description: car.description,
          available: car.available !== undefined ? car.available : true,
          createdAt: car.createdAt || new Date(),
          updatedAt: car.updatedAt || new Date()
        }
      },
      { upsert: true }
    );
  }

  console.log(`Migrated ${allCars.length} cars to SearchCar collection.`);
  await mongoose.disconnect();
}

migrate().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
