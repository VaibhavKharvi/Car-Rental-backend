const express = require('express');
const router = express.Router();
const SearchCar = require('../models/SearchCar');

// GET /api/search/cars?pickUpLocation=Mumbai
router.get('/cars', async (req, res) => {
  try {
    const { pickUpLocation } = req.query;
    const query = pickUpLocation ? { pickUpLocation } : {};
    const cars = await SearchCar.find(query);
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cars' });
  }
});

// POST /api/search/cars - Add a new car
router.post('/cars', async (req, res) => {
  try {
    const car = new SearchCar(req.body);
    await car.save();
    res.status(201).json(car);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add car', details: error.message });
  }
});

// PATCH /api/search/cars/:id - Edit a car
router.patch('/cars/:id', async (req, res) => {
  try {
    const updated = await SearchCar.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Car not found' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update car', details: error.message });
  }
});

// DELETE /api/search/cars/:id - Delete a car
router.delete('/cars/:id', async (req, res) => {
  try {
    const deleted = await SearchCar.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Car not found' });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete car', details: error.message });
  }
});

module.exports = router;
