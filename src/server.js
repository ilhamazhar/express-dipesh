const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/dbConnection');
const dotenv = require('dotenv').config();
const routes = require('./routes');

connectDB();
const port = process.env.SERVER_PORT || 5000;

const app = express();

app.use(express.json());
routes(app);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
