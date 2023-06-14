import express from 'express';
import errorHandler from './middleware/errorHandler.js';
import connectDB from './config/dbConnection.js';
import dotenv from 'dotenv';
import routes from './routes/index.js';

dotenv.config();

connectDB();
const port = process.env.SERVER_PORT || 5000;

const app = express();

app.use(express.json());
routes(app);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
