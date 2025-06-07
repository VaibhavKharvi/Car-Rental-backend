require('dotenv').config();
const mongoose = require('mongoose');
const UserProfile = require('./models/UserProfile');

const sampleProfiles = [
    {
        userName: 'user1',
        email: 'user1@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        userId: 'user123'
    },
    {
        userName: 'user2',
        email: 'user2@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        userId: 'user456'
    }
];

async function seedDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Delete existing profiles
        await UserProfile.deleteMany({});
        console.log('Existing profiles deleted');

        // Insert new profiles
        await UserProfile.insertMany(sampleProfiles);
        console.log('Profiles seeded successfully');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();
