# BMI Calculator

## Overview
This project is a simple Body Mass Index (BMI) Calculator web application built using React.js for the frontend and Node.js with Express.js and MongoDB for the backend. The BMI calculator estimates body fat based on weight and height, providing users with their BMI value and interpretation.

## Features
- Calculate BMI based on weight and height inputs
- Supports both metric (kg, cm) and imperial (lbs, in) unit systems
- Classifies BMI into categories: Underweight, Normal weight, Overweight, and Obesity
- Save BMI data to MongoDB database
- Clear input fields with a single click
- Minimalistic and user-friendly interface

## Technologies Used

### Frontend
- React.js
- Material-UI for styling
- Axios for making HTTP requests

### Backend
- Node.js
- Express.js
- MongoDB for data storage
- Mongoose as MongoDB object modeling tool
- CORS for cross-origin resource sharing

## How to Use
1. Clone the repository to your local machine.
2. Navigate to the `bmi-calculator` directory.
3. Install dependencies for both frontend and backend:
    ```
    cd bmi-calculator
    cd Bmi\ frontend
    npm install
    cd ..
    cd bmi-calculator-backend
    npm install
    ```
4. Start the backend server:
    ```
    cd bmi-calculator-backend
    npm start
    ```
5. Start the frontend development server:
    ```
    cd ..
    cd Bmi\ frontend
    npm start
    ```
6. Access the BMI Calculator application in your web browser at `http://localhost:3000/`.

## Contributors
- Nehal Chuhan - [mRcOol7](https://github.com/mRcOol7)
