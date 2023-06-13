const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Register a user
const registerUser = asyncHandler(async (req, res) => {
  // const contacts = await Contact.find();
  const { name, username, email, password } = req.body;
  if (!name || !username || !email || !password) {
    res.status(400);
    throw new Error('All field are mandatory');
  }
  // Check user available
  const userAvailable = await User.findOne({ username, email });
  if (userAvailable) {
    res.status(400);
    throw new Error('User already registered!');
  }
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(`Hashed password: ${hashedPassword}`);
  const user = await User.create({
    name,
    username,
    email,
    password: hashedPassword,
  });

  res.status(200).json({ message: 'User created', data: user });
});

// Login the user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error('All fields are mandatory');
  }
  const user = await User.findOne({ email });
  // Compare password with hashedPassword
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '3m' }
    );
    const refreshToken = jwt.sign(
      {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    );
    res.status(200).json({
      status: 'Success',
      message: 'Login succesed.',
      data: { accessToken, refreshToken },
    });
  } else {
    res.status(401);
    throw new Error('Email or Password is not valid');
  }
});

// Current user
const currentUser = asyncHandler(async (req, res) => {
  const user = await req.user;
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  res
    .status(200)
    .json({ status: 'Success', message: 'Current user', data: user });
});

// Get all users
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json({ message: 'Get all users', data: users });
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
  getAllUsers,
};
