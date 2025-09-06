require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000; // Update port to 3000

// MongoDB connection
console.log('Attempting to connect to MongoDB...');

mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;

db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

db.once('open', () => {
    console.log('Successfully connected to MongoDB Atlas');
    console.log('Database name:', db.name);
    console.log('Host:', db.host);
    console.log('Port:', db.port);
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('MongoDB connection closed due to app termination');
    process.exit(0);
});

// Define BMI schema
const BMISchema = new mongoose.Schema({
    weight: Number,
    height: Number,
    bmi: Number,
    bmiCategory: String
});

// Define model for "bmidata" collection
const BMIModel = mongoose.model('bmidata', BMISchema);

// Allowed origins
const allowedOrigins = [
    'https://body-mass-index-cal-aabc.vercel.app',
    'http://localhost:3000' // For local development
];

// CORS configuration
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error stack:', err.stack);
    res.status(500).json({
        error: 'Internal Server Error',
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

// API endpoint to save BMI data
app.post('/api/bmi', async (req, res, next) => {
    try {
        console.log('Received request with body:', req.body);
        
        const { weight, height, bmi, bmiCategory } = req.body;

        // Validate required fields
        if (weight === undefined || height === undefined || bmi === undefined || !bmiCategory) {
            return res.status(400).json({
                error: 'Missing required fields',
                required: ['weight', 'height', 'bmi', 'bmiCategory'],
                received: { weight, height, bmi, bmiCategory }
            });
        }

        // Create a new BMI document
        const newBMI = new BMIModel({
            weight: parseFloat(weight),
            height: parseFloat(height),
            bmi: parseFloat(bmi),
            bmiCategory: String(bmiCategory)
        });

        // Save the new BMI document to the database
        const savedBMI = await newBMI.save();
        console.log('BMI data saved:', savedBMI);

        // Respond with success message
        res.status(201).json({ 
            success: true,
            message: 'BMI data saved successfully',
            data: savedBMI
        });
    } catch (error) {
        // Pass error to error handling middleware
        next(error);
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
