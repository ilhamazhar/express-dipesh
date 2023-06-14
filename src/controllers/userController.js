import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from './../models/userModel.js';

// Register a user
const registerUser = asyncHandler(async (req, res) => {
  try {
    // const contacts = await Contact.find();
    const { role_id, name, username, email, password } = req.body;
    if (!role_id || !name || !username || !email || !password) {
      res.status(400);
      throw new Error('All field are mandatory');
    }
    // Check user available
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
      res.status(400);
      throw new Error('User already registered!');
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log(`Hashed password: ${hashedPassword}`);
    const user = await User.create({
      role_id,
      name,
      username,
      email,
      password: hashedPassword,
    });

    res
      .status(200)
      .json({ status: 'Success', message: 'User created', data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login the user
const loginUser = asyncHandler(async (req, res) => {
  try {
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
            role_id: user.role_id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1h' }
      );
      res.status(200).json({
        status: 'Success',
        message: 'Login succesed.',
        data: { accessToken },
      });
    } else {
      res.status(401);
      throw new Error('Email or Password is not valid');
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Current user
const currentUser = asyncHandler(async (req, res) => {
  try {
    const user = await req.user;
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }
    res
      .status(200)
      .json({ status: 'Success', message: 'Current user', data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all users
const getAllUsers = asyncHandler(async (req, res) => {
  if (req.user.role_id !== 1) {
    res.status(403);
    throw new Error(`User don't have permission to get the users`);
  }
  const users = await User.find();
  // console.log(users);
  res.status(200).json({ message: 'Get all users', data: users });
});

// Edit user
const editUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  // console.log(user.id.toString() !== req.user.id);
  if (user.id.toString() !== req.user.id) {
    res.status(403);
    throw new Error(`User don't have permission to update this user`);
  }

  const editedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({
    message: `Edit a user for ${req.params.id}`,
    data: editedUser,
  });
});

export { registerUser, loginUser, currentUser, getAllUsers, editUser };
