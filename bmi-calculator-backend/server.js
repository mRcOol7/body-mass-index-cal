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

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API endpoint to save BMI data
app.post('/api/bmi', async (req, res) => {
    try {
        const { weight, height, bmi, bmiCategory } = req.body;

        // Create a new BMI document
        const newBMI = new BMIModel({
            weight,
            height,
            bmi,
            bmiCategory
        });

        // Save the new BMI document to the database
        await newBMI.save();

        // Respond with success message
        res.status(201).json({ message: 'BMI data saved successfully' });
    } catch (error) {
        // Handle errors and respond with error message
        console.error('Error saving BMI data:', error);
        res.status(500).json({ error: 'Failed to save BMI data' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
