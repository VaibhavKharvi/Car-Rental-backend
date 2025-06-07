const express = require('express');
const router = express.Router();
const EconCar = require('../models/EconCar');

// GET all economy cars
router.get('/', async (req, res) => {
  try {
    const cars = await EconCar.find({});
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch economy cars' });
  }
});

// POST /api/econ-cars - Add a new economy car
router.post('/', async (req, res) => {
  try {
    const car = new EconCar(req.body);
    await car.save();
    res.status(201).json(car);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add economy car', details: error.message });
  }
});

// PATCH /api/econ-cars/:id - Edit an economy car
router.patch('/:id', async (req, res) => {
  try {
    const updated = await EconCar.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Car not found' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update economy car', details: error.message });
  }
});

// DELETE /api/econ-cars/:id - Delete an economy car
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await EconCar.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Car not found' });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete economy car', details: error.message });
  }
});

module.exports = router;
