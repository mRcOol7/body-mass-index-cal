import React from 'react';
import './App.css';
import BMICalculator from './BMICalculator';
import { Typography, Paper } from '@mui/material';
import axios from 'axios';

function App() {
    const handleSaveBMI = async (data) => {
        try {
            console.log('Sending BMI data:', data);
            const response = await axios.post('https://body-mass-index-cal.vercel.app/api/bmi', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
                validateStatus: (status) => status < 500 // Reject only if status is 500 or higher
            });
            
            if (response.data && response.data.success) {
                console.log('BMI data saved successfully:', response.data);
                return { success: true, data: response.data.data };
            } else {
                console.error('Failed to save BMI data:', response.data);
                return { 
                    success: false, 
                    error: response.data?.error || 'Failed to save BMI data',
                    details: response.data
                };
            }
        } catch (error) {
            console.error('Error saving BMI data:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
                config: {
                    url: error.config?.url,
                    method: error.config?.method,
                    data: error.config?.data
                }
            });
            
            return {
                success: false,
                error: error.response?.data?.message || error.message || 'Failed to connect to the server',
                details: error.response?.data || error
            };
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
