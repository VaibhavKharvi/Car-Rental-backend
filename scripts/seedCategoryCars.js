require('dotenv').config();
const mongoose = require('mongoose');
const EconCar = require('../models/EconCar');
const SuvCar = require('../models/SuvCar');
const LuxCar = require('../models/LuxCar');
const ConvCar = require('../models/ConvCar');

const econCars = [
  {
    carId: 'EC001',
    carName: 'Maruti Suzuki Swift',
    carImage: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/2018_Maruti_Suzuki_Swift_DZire_VXi_1.2_Front.jpg',
    pricePerDay: 1500,
    description: 'Petrol, Manual, 5 Seats'
  },
  {
    carId: 'EC002',
    carName: 'Tata Tiago',
    carImage: 'https://upload.wikimedia.org/wikipedia/commons/9/9b/2017_Tata_Tiago_XZ_Revotron_1.2_Front.jpg',
    pricePerDay: 1300,
    description: 'Petrol, Manual, 5 Seats'
  },
  {
    carId: 'EC003',
    carName: 'Honda Jazz',
    carImage: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/2018_Honda_Jazz_EX_i-VTEC_CVT_1.3_Front.jpg',
    pricePerDay: 1550,
    description: 'Petrol, Manual, 5 Seats'
  },
  {
    carId: 'EC004',
    carName: 'Hyundai i20',
    carImage: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/2017_Hyundai_i20_Active_1.2_Front.jpg',
    pricePerDay: 1600,
    description: 'Petrol, Manual, 5 Seats'
  },
  {
    carId: 'EC005',
    carName: 'Renault Kwid',
    carImage: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/2015_Renault_Kwid_RXT_1.0.jpg',
    pricePerDay: 1200,
    description: 'Petrol, Manual, 5 Seats'
  },
  {
    carId: 'EC006',
    carName: 'Maruti Suzuki Baleno',
    carImage: 'https://upload.wikimedia.org/wikipedia/commons/6/69/2017_Maruti_Suzuki_Baleno_ZDi_1.3_Front.jpg',
    pricePerDay: 1700,
    description: 'Petrol, Manual, 5 Seats'
  },
  {
    carId: 'EC007',
    carName: 'Hyundai Grand i10',
    carImage: 'https://upload.wikimedia.org/wikipedia/commons/9/98/2017_Hyundai_Grand_i10_1.2_Front.jpg',
    pricePerDay: 1400,
    description: 'Petrol, Manual, 5 Seats'
  },
  {
    carId: 'EC008',
    carName: 'Maruti Suzuki Celerio',
    carImage: 'https://upload.wikimedia.org/wikipedia/commons/6/64/2017_Maruti_Suzuki_Celerio_XA_1.0_Front.jpg',
    pricePerDay: 1250,
    description: 'Petrol, Manual, 5 Seats'
  }
];

const suvCars = [
  {
    carId: 'SV001',
    carName: 'Toyota Fortuner',
    carImage: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/2017_Toyota_Fortuner_%28GUN156R%29_Crusade_wagon_%282018-09-02%29_01.jpg',
    pricePerDay: 3500,
    description: 'Diesel, Automatic, 7 Seats'
  },
  {
    carId: 'SV002',
    carName: 'Mahindra Scorpio',
    carImage: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/2015_Mahindra_Scorpio_S10_2.2_Front.jpg',
    pricePerDay: 2550,
    description: 'Diesel, Manual, 7 Seats'
  },
  {
    carId: 'SV003',
    carName: 'Toyota Innova Crysta',
    carImage: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/2016_Toyota_Innova_Crysta_2.8_Z_2.8.jpg',
    pricePerDay: 3200,
    description: 'Diesel, Automatic, 7 Seats'
  },
  {
    carId: 'SV004',
    carName: 'Kia Seltos',
    carImage: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/2020_Kia_Seltos_S_1.6_Front.jpg',
    pricePerDay: 2600,
    description: 'Petrol, Automatic, 5 Seats'
  },
  {
    carId: 'SV005',
    carName: 'Hyundai Creta',
    carImage: 'https://upload.wikimedia.org/wikipedia/commons/2/26/2017_Hyundai_Creta_1.6_Front.jpg',
    pricePerDay: 2800,
    description: 'Petrol, Manual, 5 Seats'
  },
  {
    carId: 'SV006',
    carName: 'Tata Harrier',
    carImage: 'https://upload.wikimedia.org/wikipedia/commons/7/72/2019_Tata_Harrier_XZ%2B_2.0_Front.jpg',
    pricePerDay: 2900,
    description: 'Diesel, Manual, 5 Seats'
  },
  {
    carId: 'SV007',
    carName: 'Mahindra XUV500',
    carImage: 'https://upload.wikimedia.org/wikipedia/commons/7/76/2017_Mahindra_XUV500_W10_2.2_Front.jpg',
    pricePerDay: 2700,
    description: 'Diesel, Manual, 7 Seats'
  },
  {
    carId: 'SV008',
    carName: 'Ford EcoSport',
    carImage: 'https://upload.wikimedia.org/wikipedia/commons/3/32/2017_Ford_EcoSport_Trend_1.5_Front.jpg',
    pricePerDay: 2400,
    description: 'Petrol, Manual, 5 Seats'
  }
];

const luxCars = [
  {
    carId: 'LX001',
    carName: 'BMW 3 Series',
    carImage: 'https://upload.wikimedia.org/wikipedia/commons/4/44/BMW_G20_IMG_0400.jpg',
    pricePerDay: 4800,
    description: 'Petrol, Automatic, 5 Seats'
  },
  {
    carId: 'LX002',
    carName: 'Mercedes-Benz E-Class',
    carImage: 'https://upload.wikimedia.org/wikipedia/commons/1/12/2017_Mercedes-Benz_E-Class_%28W213%29_200_2.0_Front.jpg',
    pricePerDay: 6500,
    description: 'Petrol, Automatic, 5 Seats'
  },
  {
    carId: 'LX003',
    carName: 'Audi A6',
    carImage: 'https://upload.wikimedia.org/wikipedia/commons/3/36/2017_Audi_A6_3.0_TDI_Front.jpg',
    pricePerDay: 7000,
    description: 'Diesel, Automatic, 5 Seats'
  },
  {
    carId: 'LX004',
    carName: 'Jaguar XE',
    carImage: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/2017_Jaguar_XE_R-Sport_2.0_Front.jpg',
    pricePerDay: 6500,
    description: 'Petrol, Automatic, 5 Seats'
  },
  {
    carId: 'LX005',
    carName: 'Volvo S90',
    carImage: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/2017_Skoda_Superb_SE_TDI_2.0_Front.jpg',
    pricePerDay: 7200,
    description: 'Diesel, Automatic, 5 Seats'
  },
  {
    carId: 'LX006',
    carName: 'Skoda Superb',
    carImage: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/2017_Skoda_Superb_SE_TDI_2.0_Front.jpg',
    pricePerDay: 6800,
    description: 'Petrol, Automatic, 5 Seats'
  },
  {
    carId: 'LX007',
    carName: 'Mini Cooper',
    carImage: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/2018_MINI_Cooper_S_Automatic_2.0_Front.jpg',
    pricePerDay: 7500,
    description: 'Petrol, Automatic, 4 Seats'
  },
  {
    carId: 'LX008',
    carName: 'BMW 5 Series',
    carImage: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/2017_BMW_5_Series_%28G30%29_520d_2.0_Front.jpg',
    pricePerDay: 8500,
    description: 'Diesel, Automatic, 5 Seats'
  }
];

const convCars = [
  {
    carId: 'CV001',
    carName: 'Mini Cooper Convertible',
    carImage: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/2018_MINI_Convertible_Cooper_S_Automatic_2.0_Front.jpg',
    pricePerDay: 7500,
    description: 'Petrol, Automatic, 4 Seats'
  },
  {
    carId: 'CV002',
    carName: 'Mazda MX-5 Convertible',
    carImage: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/2015_Mazda_MX-5_ND_2.0.jpg',
    pricePerDay: 8100,
    description: 'Petrol, Automatic, 2 Seats'
  },
  {
    carId: 'CV003',
    carName: 'BMW 4 Series Convertible',
    carImage: 'https://upload.wikimedia.org/wikipedia/commons/4/46/2017_BMW_4_Series_%28F33%29_420d_2.0_Front.jpg',
    pricePerDay: 9000,
    description: 'Diesel, Automatic, 4 Seats'
  },
  {
    carId: 'CV004',
    carName: 'Mercedes-Benz C-Class Convertible',
    carImage: 'https://upload.wikimedia.org/wikipedia/commons/7/72/2017_Mercedes-Benz_C-Class_%28W205%29_C200_2.0_Front.jpg',
    pricePerDay: 9500,
    description: 'Petrol, Automatic, 4 Seats'
  },
  {
    carId: 'CV005',
    carName: 'Audi A5 Cabriolet',
    carImage: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/2017_Audi_A5_Cabriolet_2.0_TDI_Front.jpg',
    pricePerDay: 8800,
    description: 'Diesel, Automatic, 4 Seats'
  },
  {
    carId: 'CV006',
    carName: 'Volkswagen Beetle Convertible',
    carImage: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/VW_Beetle_Cabrio_2013_%281%29.JPG',
    pricePerDay: 8000,
    description: 'Petrol, Automatic, 4 Seats'
  },
  {
    carId: 'CV007',
    carName: 'Ford Mustang Convertible',
    carImage: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/2018_Ford_Mustang_GT_5.0_Front.jpg',
    pricePerDay: 9200,
    description: 'Petrol, Automatic, 4 Seats'
  },
  {
    carId: 'CV008',
    carName: 'Porsche 911 Convertible',
    carImage: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/2019_Porsche_911_Carrera_S_Cabriolet_3.0_Front.jpg',
    pricePerDay: 12000,
    description: 'Petrol, Automatic, 2 Seats'
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    const connStr = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/DriveSeva';
    console.log('Connecting to MongoDB with connection string:', connStr);
    await mongoose.connect(connStr, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');

    // Clear existing data
    await EconCar.deleteMany({});
    await SuvCar.deleteMany({});
    await LuxCar.deleteMany({});
    await ConvCar.deleteMany({});
    console.log('Cleared existing data');

    // Insert new data
    await EconCar.insertMany(econCars);
    await SuvCar.insertMany(suvCars);
    await LuxCar.insertMany(luxCars);
    await ConvCar.insertMany(convCars);
    console.log('Inserted new car data');

    console.log('Seeding completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
