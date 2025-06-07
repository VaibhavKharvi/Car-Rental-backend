const express = require('express');
const router = express.Router();
const LuxCar = require('../models/LuxCar');

// GET all luxury cars
router.get('/', async (req, res) => {
  try {
    const cars = await LuxCar.find({});
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch luxury cars' });
  }
});

// POST /api/lux-cars - Add a new luxury car
router.post('/', async (req, res) => {
  try {
    const car = new LuxCar(req.body);
    await car.save();
    res.status(201).json(car);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add luxury car', details: error.message });
  }
});

// PATCH /api/lux-cars/:id - Edit a luxury car
router.patch('/:id', async (req, res) => {
  try {
    const updated = await LuxCar.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Car not found' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update luxury car', details: error.message });
  }
});

// DELETE /api/lux-cars/:id - Delete a luxury car
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await LuxCar.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Car not found' });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete luxury car', details: error.message });
  }
});

module.exports = router;
