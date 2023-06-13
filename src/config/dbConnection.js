const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(
      'mongodb://localhost:27017/mongo-docker'
    );
    console.log('Database connected with host:', connect.connection.host);
  } catch (err) {
    console.log('Hallo:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
