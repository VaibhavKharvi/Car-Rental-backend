const express = require('express');
const router = express.Router();
const UserActivity = require('../../models/UserActivity');

// DELETE /admin/bookings/:bookingId - Delete a booking by bookingId
router.delete('/:bookingId', async (req, res) => {
  try {
    const booking = await UserActivity.findOneAndDelete({ bookingId: req.params.bookingId });
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
    res.json({ success: true, message: 'Booking deleted', booking });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete booking', error: err.message });
  }
});

module.exports = router;
