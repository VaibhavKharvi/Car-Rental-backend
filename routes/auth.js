const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Public route to check all existing users
router.get('/all-users', async (req, res) => {
  try {
    const users = await User.find({}, { password: 0, createdAt: 0 });
    res.json(users);
  } catch (error) {
    console.error('Error fetching all users:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// Public route to check if username/email exists
router.get('/check-user', async (req, res) => {
  try {
    const { username, email } = req.query;
    if (!username && !email) {
      return res.status(400).json({ message: 'Username or email is required' });
    }

    const query = {};
    if (username) query.username = username;
    if (email) query.email = email.toLowerCase();

    const existingUser = await User.findOne(query, { password: 0 });
    if (existingUser) {
      res.json({ exists: true, user: existingUser });
    } else {
      res.json({ exists: false });
    }
  } catch (error) {
    console.error('Error checking user:', error);
    res.status(500).json({ message: 'Error checking user' });
  }
});

// Debug route to check existing users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }); // Don't include passwords
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// Signup route
router.post('/signup', async (req, res) => {
  try {
    console.log('Signup request received:', req.body); // Debug log
    
    const { username, email, password, confirmPassword } = req.body;

    // Validate input
    if (!username || !email || !password || !confirmPassword) {
      console.log('Validation failed: Missing fields'); // Debug log
      return res.status(400).json({ 
        message: 'All fields are required',
        error: 'Missing required fields' 
      });
    }

    if (password !== confirmPassword) {
      console.log('Validation failed: Passwords do not match'); // Debug log
      return res.status(400).json({ 
        message: 'Passwords do not match',
        error: 'Passwords do not match' 
      });
    }

    // Check if user already exists
    console.log('Checking if user exists with username:', username, 'and email:', email); // Debug log
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      console.log('User found:', {
        userId: existingUser.userId,
        username: existingUser.username,
        email: existingUser.email
      }); // Debug log
      return res.status(400).json({ 
        message: 'Username or email already exists',
        error: 'User already exists',
        existing: {
          userId: existingUser.userId,
          username: existingUser.username,
          email: existingUser.email
        }
      });
    }

    // Generate userId
    const prefix = 'USER';
    const count = await User.countDocuments();
    const userId = `${prefix}${String(count + 1).padStart(3, '0')}`;

    console.log('Generating user with userId:', userId); // Debug log

    // Create new user
    const user = new User({
      userId,
      username,
      email,
      password
    });

    await user.save();
    console.log('User saved successfully'); // Debug log

    // Generate JWT token
    console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Present' : 'Not present'); // Debug log
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET not configured in environment variables');
      return res.status(500).json({ 
        message: 'Server configuration error',
        error: 'JWT_SECRET not configured' 
      });
    }

    try {
      console.log('Attempting to generate JWT token for user:', user.userId); // Debug log
      const token = jwt.sign(
        { userId: user.userId },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
      console.log('JWT token generated successfully'); // Debug log
      res.status(201).json({
        message: 'User created successfully',
        userId: user.userId,
        token
      });
    } catch (jwtError) {
      console.error('JWT token generation error:', jwtError);
      res.status(500).json({ 
        message: 'Server error during token generation',
        error: jwtError.message 
      });
    }
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ 
      message: 'Server error',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { identifier, password } = req.body;
    console.log('Login attempt:', { identifier }); // Debug log

    // Validate input
    if (!identifier || !password) {
      return res.status(400).json({ 
        message: 'Username/email and password are required',
        error: 'Missing required fields' 
      });
    }

    // Find user by username or email (case-insensitive for email)
    const user = await User.findOne({
      $or: [
        { username: identifier },
        { email: { $regex: identifier.toLowerCase(), $options: 'i' } }
      ]
    }).select('+password'); // Include password for comparison

    if (!user) {
      console.log('No user found for identifier:', identifier); // Debug log
      return res.status(401).json({ 
        message: 'Invalid credentials',
        error: 'User not found' 
      });
    }

    // Verify password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log('Password mismatch for user:', user.userId); // Debug log
      return res.status(401).json({ 
        message: 'Invalid credentials',
        error: 'Password mismatch' 
      });
    }

    console.log('Login successful for user:', user.userId); // Debug log
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user.userId },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      userId: user.userId,
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      message: 'Server error',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Get user profile (protected route)
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findOne({
      userId: req.user.userId
    }).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
