const mongoose = require('mongoose');
const SearchCar = require('../models/SearchCar');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/DriveSeva', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Function to generate unique car IDs
const generateCarId = (carName, pickUpLocation) => {
  // Create a base ID using first letter of city and car name
  const cityCode = pickUpLocation.slice(0, 3).toUpperCase();
  const carCode = carName.split(' ')[0].slice(0, 3).toUpperCase();
  
  // Add a sequence number to ensure uniqueness
  let sequence = 1;
  
  // Check if this combination exists
  return SearchCar.findOne({
    carName,
    pickUpLocation
  }).then(existingCar => {
    if (existingCar && existingCar.carId) {
      // Extract sequence number from existing ID if it exists
      const match = existingCar.carId.match(/\d+$/);
      if (match) {
        sequence = parseInt(match[0]) + 1;
      }
    }
    return `${cityCode}${carCode}${sequence.toString().padStart(3, '0')}`;
  });
};

// Update all existing cars with carIds
const updateCarsWithIds = async () => {
  try {
    console.log('Starting to add carIds...');
    
    const cars = await SearchCar.find({});
    
    for (const car of cars) {
      if (!car.carId) {
        const newCarId = await generateCarId(car.carName, car.pickUpLocation);
        await SearchCar.findByIdAndUpdate(car._id, { carId: newCarId });
        console.log(`Added carId ${newCarId} to ${car.carName} in ${car.pickUpLocation}`);
      }
    }
    
    console.log('Finished adding carIds to all cars');
  } catch (error) {
    console.error('Error adding carIds:', error);
  } finally {
    mongoose.connection.close();
  }
};

updateCarsWithIds();
