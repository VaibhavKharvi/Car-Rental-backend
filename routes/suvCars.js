const express = require('express');
const router = express.Router();
const SuvCar = require('../models/SuvCar');

// GET all SUV cars
router.get('/', async (req, res) => {
  try {
    const cars = await SuvCar.find({});
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch SUV cars' });
  }
});

// POST /api/suv-cars - Add a new SUV car
router.post('/', async (req, res) => {
  try {
    const car = new SuvCar(req.body);
    await car.save();
    res.status(201).json(car);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add SUV car', details: error.message });
  }
});

// PATCH /api/suv-cars/:id - Edit an SUV car
router.patch('/:id', async (req, res) => {
  try {
    const updated = await SuvCar.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Car not found' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update SUV car', details: error.message });
  }
});

// DELETE /api/suv-cars/:id - Delete an SUV car
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await SuvCar.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Car not found' });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete SUV car', details: error.message });
  }
});

module.exports = router;
