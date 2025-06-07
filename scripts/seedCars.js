const mongoose = require('mongoose');
const SearchCar = require('../models/SearchCar');

const carData = [
// --- POPULAR MODELS (REPEATED IN ALL CITIES) ---
{
    carName: 'Maruti Suzuki Swift',
  pickUpLocation: 'Mumbai',
  carImage: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/2018_Maruti_Suzuki_Swift_DZire_VXi_1.2_Front.jpg',
  carCategory: 'Economy',
  pricePerDay: 1500,
  description: 'Petrol, Manual, 5 Seats'
},
{
  carName: 'Maruti Suzuki Swift',
  pickUpLocation: 'Chennai',
  carImage: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/2018_Maruti_Suzuki_Swift_VXi_1.2_Front.jpg',
  carCategory: 'Economy',
  pricePerDay: 1500,
  description: 'Petrol, Manual, 5 Seats'
},
{
  carName: 'Maruti Suzuki Swift',
  pickUpLocation: 'Hyderabad',
  carImage: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Maruti_Suzuki_Swift_2018_rear_view.jpg',
  carCategory: 'Economy',
  pricePerDay: 1500,
  description: 'Petrol, Manual, 5 Seats'
},
{
  carName: 'Maruti Suzuki Swift',
  pickUpLocation: 'Udupi',
  carImage: 'https://images.unsplash.com/photo-1585627804516-76db93463173',
  carCategory: 'Economy',
  pricePerDay: 1500,
  description: 'Petrol, Manual, 5 Seats'
},
{
  carName: 'Maruti Suzuki Swift',
  pickUpLocation: 'Bengaluru',
  carImage: 'https://images.unsplash.com/photo-1585627804516-76db93463173',
  carCategory: 'Economy',
  pricePerDay: 1500,
  description: 'Petrol, Manual, 5 Seats'
},
{
  carName: 'BMW 3 Series',
  pickUpLocation: 'Mumbai',
  carImage: 'https://upload.wikimedia.org/wikipedia/commons/4/44/BMW_G20_IMG_0400.jpg',
  carCategory: 'Luxury',
  pricePerDay: 4800,
  description: 'Petrol, Automatic, 5 Seats'
},
{
  carName: 'BMW 3 Series',
  pickUpLocation: 'Chennai',
  carImage: 'https://upload.wikimedia.org/wikipedia/commons/9/9b/BMW_F30_IMG_0603.jpg',
  carCategory: 'Luxury',
  pricePerDay: 4800,
  description: 'Petrol, Automatic, 5 Seats'
},
{
  carName: 'BMW 3 Series',
  pickUpLocation: 'Hyderabad',
  carImage: 'https://images.unsplash.com/photo-1585627804516-76db93463173',
  carCategory: 'Luxury',
  pricePerDay: 4800,
  description: 'Petrol, Automatic, 5 Seats'
},
{
  carName: 'BMW 3 Series',
  pickUpLocation: 'Udupi',
  carImage: 'https://images.unsplash.com/photo-1585627804516-76db93463173',
  carCategory: 'Luxury',
  pricePerDay: 4800,
  description: 'Petrol, Automatic, 5 Seats'
},
{
  carName: 'BMW 3 Series',
  pickUpLocation: 'Bengaluru',
  carImage: 'https://images.unsplash.com/photo-1585627804516-76db93463173',
  carCategory: 'Luxury',
  pricePerDay: 4800,
  description: 'Petrol, Automatic, 5 Seats'
},
// --- MUMBAI UNIQUE CARS ---
{
  carName: 'Tata Tiago',
  pickUpLocation: 'Mumbai',
  carImage: 'https://upload.wikimedia.org/wikipedia/commons/9/9b/2017_Tata_Tiago_XZ_Revotron_1.2_Front.jpg',
  carCategory: 'Economy',
  pricePerDay: 1300,
  description: 'Petrol, Manual, 5 Seats'
},
{
  carName: 'Mahindra XUV500',
  pickUpLocation: 'Mumbai',
  carImage: 'https://imgd.aeplcdn.com/664x374/cw/ec/27605/Mahindra-XUV500-Exterior-119292.jpg',
  carCategory: 'SUV',
  pricePerDay: 2700,
  description: 'Diesel, Manual, 7 Seats'
},
{
  carName: 'Jaguar XE',
  pickUpLocation: 'Mumbai',
  carImage: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/2017_Jaguar_XE_R-Sport_2.0_Front.jpg',
  carCategory: 'Luxury',
  pricePerDay: 6500,
  description: 'Petrol, Automatic, 5 Seats'
},
{
  carName: 'Mini Cooper Convertible',
  pickUpLocation: 'Mumbai',
  carImage: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/2018_MINI_Convertible_Cooper_S_Automatic_2.0_Front.jpg',
  carCategory: 'Convertible',
  pricePerDay: 7500,
  description: 'Petrol, Automatic, 4 Seats'
},
// --- CHENNAI UNIQUE CARS ---
{
  carName: 'Honda Amaze',
  pickUpLocation: 'Chennai',
  carImage: 'https://imgd.aeplcdn.com/664x374/cw/ec/27605/Honda-Amaze-Exterior-119292.jpg',
  carCategory: 'Economy',
  pricePerDay: 1450,
  description: 'Diesel, Manual, 5 Seats'
},
{
  carName: 'Toyota Fortuner',
  pickUpLocation: 'Chennai',
  carImage: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/2017_Toyota_Fortuner_%28GUN156R%29_Crusade_wagon_%282018-09-02%29_01.jpg',
  carCategory: 'SUV',
  pricePerDay: 3500,
  description: 'Diesel, Automatic, 7 Seats'
},
{
  carName: 'Audi A6',
  pickUpLocation: 'Chennai',
  carImage: 'https://imgd.aeplcdn.com/664x374/cw/ec/27605/Audi-A6-Exterior-119292.jpg',
  carCategory: 'Luxury',
  pricePerDay: 7000,
  description: 'Petrol, Automatic, 5 Seats'
},
{
  carName: 'Ford Mustang Convertible',
  pickUpLocation: 'Chennai',
  carImage: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/2018_Ford_Mustang_GT_5.0_Front.jpg',
  carCategory: 'Convertible',
  pricePerDay: 8000,
  description: 'Petrol, Automatic, 4 Seats'
},
// --- HYDERABAD UNIQUE CARS ---
{
  carName: 'Renault Kwid',
  pickUpLocation: 'Hyderabad',
  carImage: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/2015_Renault_Kwid_RXT_1.0.jpg',
  carCategory: 'Economy',
  pricePerDay: 1200,
  description: 'Petrol, Manual, 5 Seats'
},
{
  carName: 'Kia Seltos',
  pickUpLocation: 'Hyderabad',
  carImage: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/2020_Kia_Seltos_S_1.6_Front.jpg',
  carCategory: 'SUV',
  pricePerDay: 2600,
  description: 'Petrol, Automatic, 5 Seats'
},
{
  carName: 'Volvo S90',
  pickUpLocation: 'Hyderabad',
  carImage: 'https://imgd.aeplcdn.com/664x374/cw/ec/27605/Volvo-S90-Exterior-119292.jpg',
  carCategory: 'Luxury',
  pricePerDay: 7200,
  description: 'Diesel, Automatic, 5 Seats'
},
{
  carName: 'Volkswagen Beetle Convertible',
  pickUpLocation: 'Hyderabad',
  carImage: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/VW_Beetle_Cabrio_2013_%281%29.JPG',
  carCategory: 'Convertible',
  pricePerDay: 7800,
  description: 'Petrol, Automatic, 4 Seats'
},
// --- UDUPI UNIQUE CARS ---
{
  carName: 'Tata Altroz',
  pickUpLocation: 'Udupi',
  carImage: 'https://imgd.aeplcdn.com/664x374/cw/ec/27605/Tata-Altroz-Exterior-119292.jpg',
  carCategory: 'Economy',
  pricePerDay: 1400,
  description: 'Petrol, Manual, 5 Seats'
},
{
  carName: 'Mahindra Scorpio',
  pickUpLocation: 'Udupi',
  carImage: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/2015_Mahindra_Scorpio_S10_2.2_Front.jpg',
  carCategory: 'SUV',
  pricePerDay: 2550,
  description: 'Diesel, Manual, 7 Seats'
},
{
  carName: 'Skoda Superb',
  pickUpLocation: 'Udupi',
  carImage: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/2017_Skoda_Superb_SE_TDI_2.0_Front.jpg',
  carCategory: 'Luxury',
  pricePerDay: 6800,
  description: 'Petrol, Automatic, 5 Seats'
},
{
  carName: 'Mazda MX-5 Convertible',
  pickUpLocation: 'Udupi',
  carImage: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/2015_Mazda_MX-5_ND_2.0.jpg',
  carCategory: 'Convertible',
  pricePerDay: 8100,
  description: 'Petrol, Automatic, 2 Seats'
},
// --- BENGALURU UNIQUE CARS ---
{
  carName: 'Honda Jazz',
  pickUpLocation: 'Bengaluru',
  carImage: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/2018_Honda_Jazz_EX_i-VTEC_CVT_1.3_Front.jpg',
  carCategory: 'Economy',
  pricePerDay: 1550,
  description: 'Petrol, Manual, 5 Seats'
},
{
  carName: 'Toyota Innova Crysta',
  pickUpLocation: 'Bengaluru',
  carImage: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/2016_Toyota_Innova_Crysta_2.8_Z_2.8.jpg',
  carCategory: 'SUV',
  pricePerDay: 3200,
  description: 'Diesel, Automatic, 7 Seats'
},
{
  carName: 'Mercedes-Benz E-Class',
  pickUpLocation: 'Bengaluru',
  carImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70',
  carCategory: 'Luxury',
  pricePerDay: 7300,
  description: 'Petrol, Automatic, 5 Seats'
},
{
  carName: 'Porsche 911 Convertible',
  pickUpLocation: 'Bengaluru',
  carImage: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/2019_Porsche_911_Carrera_S_Cabriolet_3.0_Front.jpg',
  carCategory: 'Convertible',
  pricePerDay: 9000,
  description: 'Petrol, Automatic, 2 Seats'
},
  // Mumbai - Economy
  {
        carName: 'Maruti Suzuki Swift',
    pickUpLocation: 'Mumbai',
    carImage: 'https://images.unsplash.com/photo-1585627804516-76db93463173',
    carCategory: 'Economy',
    pricePerDay: 1500,
    description: 'Petrol, Manual, 5 Seats'
  },
  {
        carName: 'Hyundai i20',
    pickUpLocation: 'Mumbai',
    carImage: 'https://images.unsplash.com/photo-1585627804516-76db93463173',
    carCategory: 'Economy',
    pricePerDay: 1600,
    description: 'Petrol, Manual, 5 Seats'
  },
  // Mumbai - SUV
  {
        carName: 'Hyundai Creta',
    pickUpLocation: 'Mumbai',
    carImage: 'https://images.unsplash.com/photo-1585627804516-76db93463173',
    carCategory: 'SUV',
    pricePerDay: 2500,
    description: 'Petrol, Manual, 7 Seats'
  },
  {
        carName: 'Maruti Suzuki Vitara Brezza',
    pickUpLocation: 'Mumbai',
    carImage: 'https://images.unsplash.com/photo-1585627804516-76db93463173',
    carCategory: 'SUV',
    pricePerDay: 2400,
    description: 'Petrol, Manual, 5 Seats'
  },
  // Mumbai - Luxury
  {
        carName: 'Mercedes-Benz C-Class',
    pickUpLocation: 'Mumbai',
    carImage: 'https://images.unsplash.com/photo-1585627804516-76db93463173',
    carCategory: 'Luxury',
    pricePerDay: 5000,
    description: 'Petrol, Automatic, 5 Seats'
  },
  {
        carName: 'BMW 3 Series',
    pickUpLocation: 'Mumbai',
    carImage: 'https://images.unsplash.com/photo-1585627804516-76db93463173',
    carCategory: 'Luxury',
    pricePerDay: 4800,
    description: 'Petrol, Automatic, 5 Seats'
  },
  // Mumbai - Convertible
  {
        carName: 'BMW Z4',
    pickUpLocation: 'Mumbai',
    carImage: 'https://images.unsplash.com/photo-1585627804516-76db93463173',
    carCategory: 'Convertible',
    pricePerDay: 6000,
    description: 'Petrol, Automatic, 2 Seats'
  },
  {
        carName: 'Mercedes-Benz SL-Class',
    pickUpLocation: 'Mumbai',
    carImage: 'https://images.unsplash.com/photo-1585627804516-76db93463173',
    carCategory: 'Convertible',
    pricePerDay: 7000,
    description: 'Petrol, Automatic, 2 Seats'
  },

  // Chennai - Economy
  {
        carName: 'Maruti Suzuki Swift',
    pickUpLocation: 'Chennai',
    carImage: 'https://images.unsplash.com/photo-1585627804516-76db93463173',
    carCategory: 'Economy',
    pricePerDay: 1500,
    description: 'Petrol, Manual, 5 Seats'
  },
  {
        carName: 'Hyundai i20',
    pickUpLocation: 'Chennai',
    carImage: 'https://images.unsplash.com/photo-1585627804516-76db93463173',
    carCategory: 'Economy',
    pricePerDay: 1600,
    description: 'Petrol, Manual, 5 Seats'
  },
  // Chennai - SUV
  {
        carName: 'Hyundai Creta',
    pickUpLocation: 'Chennai',
    carImage: 'https://images.unsplash.com/photo-1585627804516-76db93463173',
    carCategory: 'SUV',
    pricePerDay: 2500,
    description: 'Petrol, Manual, 7 Seats'
  },
  {
        carName: 'Maruti Suzuki Vitara Brezza',
    pickUpLocation: 'Chennai',
    carImage: 'https://images.unsplash.com/photo-1585627804516-76db93463173',
    carCategory: 'SUV',
    pricePerDay: 2400,
    description: 'Petrol, Manual, 5 Seats'
  },
  // Chennai - Luxury
  {
        carName: 'Mercedes-Benz C-Class',
    pickUpLocation: 'Chennai',
    carImage: 'https://images.unsplash.com/photo-1585627804516-76db93463173',
    carCategory: 'Luxury',
    pricePerDay: 5000,
    description: 'Petrol, Automatic, 5 Seats'
  },
  {
        carName: 'BMW 3 Series',
    pickUpLocation: 'Chennai',
    carImage: 'https://images.unsplash.com/photo-1585627804516-76db93463173',
    carCategory: 'Luxury',
    pricePerDay: 4800,
    description: 'Petrol, Automatic, 5 Seats'
  },
  // Chennai - Convertible
  {
        carName: 'BMW Z4',
    pickUpLocation: 'Chennai',
    carImage: 'https://images.unsplash.com/photo-1585627804516-76db93463173',
    carCategory: 'Convertible',
    pricePerDay: 6000,
    description: 'Petrol, Automatic, 2 Seats'
  },
  {
        carName: 'Mercedes-Benz SL-Class',
    pickUpLocation: 'Chennai',
    carImage: 'https://images.unsplash.com/photo-1585627804516-76db93463173',
    carCategory: 'Convertible',
    pricePerDay: 7000,
    description: 'Petrol, Automatic, 2 Seats'
  },

  // Hyderabad - Economy
  {
        carName: 'Maruti Suzuki Swift',
    pickUpLocation: 'Hyderabad',
    carImage: 'https://images.unsplash.com/photo-1585627804516-76db93463173',
    carCategory: 'Economy',
    pricePerDay: 1500,
    description: 'Petrol, Manual, 5 Seats'
  },
  {
        carName: 'Hyundai i20',
    pickUpLocation: 'Hyderabad',
    carImage: 'https://images.unsplash.com/photo-1585627804516-76db93463173',
    carCategory: 'Economy',
    pricePerDay: 1600,
    description: 'Petrol, Manual, 5 Seats'
  },
  // Hyderabad - SUV
  {
        carName: 'Hyundai Creta',
    pickUpLocation: 'Hyderabad',
    carImage: 'https://images.unsplash.com/photo-1585627804516-76db93463173',
    carCategory: 'SUV',
    pricePerDay: 2500,
    description: 'Petrol, Manual, 7 Seats'
  },
  {
        carName: 'Maruti Suzuki Vitara Brezza',
    pickUpLocation: 'Hyderabad',
    carImage: 'https://images.unsplash.com/photo-1585627804516-76db93463173',
    carCategory: 'SUV',
    pricePerDay: 2400,
    description: 'Petrol, Manual, 5 Seats'
  },
  // Hyderabad - Luxury
  {
        carName: 'Mercedes-Benz C-Class',
    pickUpLocation: 'Hyderabad',
    carImage: 'https://images.unsplash.com/photo-1585627804516-76db93463173',
    carCategory: 'Luxury',
    pricePerDay: 5000,
    description: 'Petrol, Automatic, 5 Seats'
  },
  {
        carName: 'BMW 3 Series',
    pickUpLocation: 'Hyderabad',
    carImage: 'https://images.unsplash.com/photo-1585627804516-76db93463173',
    carCategory: 'Luxury',
    pricePerDay: 4800,
    description: 'Petrol, Automatic, 5 Seats'
  },
  // Hyderabad - Convertible
  {
        carName: 'BMW Z4',
    pickUpLocation: 'Hyderabad',
    carImage: 'https://images.unsplash.com/photo-1585627804516-76db93463173',
    carCategory: 'Convertible',
    pricePerDay: 6000,
    description: 'Petrol, Automatic, 2 Seats'
  },
  {
        carName: 'Mercedes-Benz SL-Class',
    pickUpLocation: 'Hyderabad',
    carImage: 'https://images.unsplash.com/photo-1585627804516-76db93463173',
    carCategory: 'Convertible',
    pricePerDay: 7000,
    description: 'Petrol, Automatic, 2 Seats'
  },

  // Udupi - Economy
  {
        carName: 'Maruti Suzuki Swift',
    pickUpLocation: 'Udupi',
    carImage: 'https://images.unsplash.com/photo-1585627804516-76db93463173',
    carCategory: 'Economy',
    pricePerDay: 1500,
    description: 'Petrol, Manual, 5 Seats'
  },
  {
        carName: 'Hyundai i20',
    pickUpLocation: 'Udupi',
    carImage: 'https://images.unsplash.com/photo-1585627804516-76db93463173',
    carCategory: 'Economy',
    pricePerDay: 1600,
    description: 'Petrol, Manual, 5 Seats'
  },
  // Udupi - SUV
  {
        carName: 'Hyundai Creta',
    pickUpLocation: 'Udupi',
    carImage: 'https://images.unsplash.com/photo-1585627804516-76db93463173',
    carCategory: 'SUV',
    pricePerDay: 2500,
    description: 'Petrol, Manual, 7 Seats'
  },
  {
        carName: 'Maruti Suzuki Vitara Brezza',
    pickUpLocation: 'Udupi',
    carImage: 'https://images.unsplash.com/photo-1585627804516-76db93463173',
    carCategory: 'SUV',
    pricePerDay: 2400,
    description: 'Petrol, Manual, 5 Seats'
  },
  // Udupi - Luxury
  {
        carName: 'Mercedes-Benz C-Class',
    pickUpLocation: 'Udupi',
    carImage: 'https://images.unsplash.com/photo-1585627804516-76db93463173',
    carCategory: 'Luxury',
    pricePerDay: 5000,
    description: 'Petrol, Automatic, 5 Seats'
  },
  {
        carName: 'BMW 3 Series',
    pickUpLocation: 'Udupi',
    carImage: 'https://images.unsplash.com/photo-1585627804516-76db93463173',
    carCategory: 'Luxury',
    pricePerDay: 4800,
    description: 'Petrol, Automatic, 5 Seats'
  },
  // Udupi - Convertible
  {
        carName: 'BMW Z4',
    pickUpLocation: 'Udupi',
    carImage: 'https://images.unsplash.com/photo-1585627804516-76db93463173',
    carCategory: 'Convertible',
    pricePerDay: 6000,
    description: 'Petrol, Automatic, 2 Seats'
  },
  {
        carName: 'Mercedes-Benz SL-Class',
    pickUpLocation: 'Udupi',
    carImage: 'https://images.unsplash.com/photo-1585627804516-76db93463173',
    carCategory: 'Convertible',
    pricePerDay: 7000,
    description: 'Petrol, Automatic, 2 Seats'
  },

  // Bengaluru - Economy
  {
        carName: 'Maruti Suzuki Swift',
    pickUpLocation: 'Bengaluru',
    carImage: 'https://images.unsplash.com/photo-1585627804516-76db93463173',
    carCategory: 'Economy',
    pricePerDay: 1500,
    description: 'Petrol, Manual, 5 Seats'
  },
  {
        carName: 'Hyundai i20',
    pickUpLocation: 'Bengaluru',
    carImage: 'https://images.unsplash.com/photo-1585627804516-76db93463173',
    carCategory: 'Economy',
    pricePerDay: 1600,
    description: 'Petrol, Manual, 5 Seats'
  },
  // Bengaluru - SUV
  {
        carName: 'Hyundai Creta',
    pickUpLocation: 'Bengaluru',
    carImage: 'https://images.unsplash.com/photo-1585627804516-76db93463173',
    carCategory: 'SUV',
    pricePerDay: 2500,
    description: 'Petrol, Manual, 7 Seats'
  },
  {
        carName: 'Maruti Suzuki Vitara Brezza',
    pickUpLocation: 'Bengaluru',
    carImage: 'https://images.unsplash.com/photo-1585627804516-76db93463173',
    carCategory: 'SUV',
    pricePerDay: 2400,
    description: 'Petrol, Manual, 5 Seats'
  },
  // Bengaluru - Luxury
  {
        carName: 'Mercedes-Benz C-Class',
    pickUpLocation: 'Bengaluru',
    carImage: 'https://images.unsplash.com/photo-1585627804516-76db93463173',
    carCategory: 'Luxury',
    pricePerDay: 5000,
    description: 'Petrol, Automatic, 5 Seats'
  },
  {
        carName: 'BMW 3 Series',
    pickUpLocation: 'Bengaluru',
    carImage: 'https://images.unsplash.com/photo-1585627804516-76db93463173',
    carCategory: 'Luxury',
    pricePerDay: 4800,
    description: 'Petrol, Automatic, 5 Seats'
  },
  // Bengaluru - Convertible
  {
        carName: 'BMW Z4',
    pickUpLocation: 'Bengaluru',
    carImage: 'https://images.unsplash.com/photo-1585627804516-76db93463173',
    carCategory: 'Convertible',
    pricePerDay: 6000,
    description: 'Petrol, Automatic, 2 Seats'
  },
  {
        carName: 'Mercedes-Benz SL-Class',
    pickUpLocation: 'Bengaluru',
    carImage: 'https://images.unsplash.com/photo-1585627804516-76db93463173',
    carCategory: 'Convertible',
    pricePerDay: 7000,
    description: 'Petrol, Automatic, 2 Seats'
  }
];

// Helper to generate unique carId for SearchCar
function generateCarId(idx) {
  return `SC${String(idx + 1).padStart(3, '0')}`;
}

async function seedCars() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb+srv://chetanshetty06:1234@crs.wiomqmu.mongodb.net/DriveSeva?retryWrites=true&w=majority');
    console.log('Connected to MongoDB');

    // Clear existing data
    await SearchCar.deleteMany({});
    console.log('Cleared existing data');

    // Add carId to each car
    const carDataWithId = carData.map((car, idx) => ({
      ...car,
      carId: car.carId || generateCarId(idx)
    }));

    // Insert new data
    await SearchCar.insertMany(carDataWithId);
    console.log('Inserted new car data');

    console.log('Seeding completed successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    // Close the connection
    await mongoose.disconnect();
  }
}

// Run the seeding function
seedCars();
