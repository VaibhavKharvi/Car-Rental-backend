const express = require('express');
const router = express.Router();
const ConvCar = require('../models/ConvCar');

// GET all convertible cars
router.get('/', async (req, res) => {
  try {
    const cars = await ConvCar.find({});
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch convertible cars' });
  }
});

// POST /api/conv-cars - Add a new convertible car
router.post('/', async (req, res) => {
  try {
    const car = new ConvCar(req.body);
    await car.save();
    res.status(201).json(car);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add convertible car', details: error.message });
  }
});

// PATCH /api/conv-cars/:id - Edit a convertible car
router.patch('/:id', async (req, res) => {
  try {
    const updated = await ConvCar.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Car not found' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update convertible car', details: error.message });
  }
});

// DELETE /api/conv-cars/:id - Delete a convertible car
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await ConvCar.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Car not found' });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete convertible car', details: error.message });
  }
});

module.exports = router;
