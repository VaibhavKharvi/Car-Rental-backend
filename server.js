require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/db");

// Log environment variables for debugging
console.log("Environment variables:");
console.log("MONGO_URI:", process.env.MONGO_URI);

const app = express();

// Middleware
app.use(cors({
  origin: "https://car-rental-backend-hgwt.onrender.com/",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint for frontend
app.get('/api/test', (req, res) => {
  res.json({ message: "Backend server is running" });
});

// Connect to database before starting server
const startServer = async () => {
  try {
    await connectDB();
    console.log("MongoDB connection successful");
    
    // Routes
    app.use('/api/auth', require('./routes/auth'));
    app.use('/api/search', require('./routes/searchCar'));
    app.use('/api/econ-cars', require('./routes/econCars'));
    app.use('/api/suv-cars', require('./routes/suvCars'));
    app.use('/api/lux-cars', require('./routes/luxCars'));
    app.use('/api/conv-cars', require('./routes/convCars'));
    app.use('/api/bookings', require('./routes/client/bookingRoutes'));
    app.use('/admin/bookings', require('./routes/admin/bookingRoutes'));

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

// Start the server
startServer();

// Connect to MongoDB using the centralized configuration
connectDB()
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
