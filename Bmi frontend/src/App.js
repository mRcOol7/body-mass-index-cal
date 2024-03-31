import React from 'react';
import './App.css';
import BMICalculator from './BMICalculator';
import { Typography, Paper } from '@mui/material';
import axios from 'axios';

function App() {
    const handleSaveBMI = async (data) => {
        try {
            const response = await axios.post('http://localhost:3000/api/bmi', data); // Updated URL
            console.log('BMI data saved successfully:', response.data);
        } catch (error) {
            console.error('Error saving BMI data:', error);
        }
    };

    return (
        <div className="bmi-calculator-app">
            <header className="header">
                <Typography variant="h1" className="header-title">BMI Calculator</Typography>
            </header>
            <main className="main-content">
                <div className="container">
                    <BMICalculator onSave={handleSaveBMI} />
                    <Paper elevation={3} className="disclaimer p-4 mb-4">
                        <Typography variant="h6" component="h2" gutterBottom>
                            Disclaimer
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            This BMI calculator provides an estimate of body fat based on weight and height.
                            It's important to note that BMI is not a perfect measure and may not accurately reflect individual health.
                        </Typography>
                        <Typography variant="body1">
                            Consult with a healthcare professional for personalized advice and guidance on maintaining a healthy lifestyle.
                        </Typography>
                    </Paper>
                </div>
            </main>
            <footer className="footer bg-primary text-white text-center py-3">
                <p>Created with React.js</p>
            </footer>
        </div>
    );
}

export default App;
