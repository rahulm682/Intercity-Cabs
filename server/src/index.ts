import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import routeRoutes from './routes/routeRoutes.js';
import userRoutes from './routes/userRoutes.js';
import inquiryRoutes from './routes/inquiryRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';

// Load config
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors()); // Allow frontend to talk to backend
app.use(express.json()); // Allow parsing JSON body


app.use('/api/routes', routeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/feedbacks', feedbackRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});