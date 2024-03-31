import React, { useState } from 'react';
import { BiCalculator, BiReset } from 'react-icons/bi';
import './BMICalculator.css';

const BMICalculator = ({ onSave }) => {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [bmi, setBMI] = useState(null);
    const [bmiCategory, setBMICategory] = useState('');
    const [unitSystem, setUnitSystem] = useState('metric');
    const [saveMessage, setSaveMessage] = useState('');

    const calculateBMI = async () => {
        let weightValue = parseFloat(weight);
        let heightValue = parseFloat(height);

        if (unitSystem === 'imperial') {
            weightValue *= 0.453592;
            heightValue *= 0.0254;
        } else {
            heightValue /= 100;
        }

        const bmiValue = weightValue / (heightValue * heightValue);
        setBMI(bmiValue.toFixed(2));

        const category = getBMICategory(bmiValue);
        setBMICategory(category);

        try {
            await onSave({
                weight: weightValue,
                height: heightValue,
                bmi: bmiValue.toFixed(2),
                bmiCategory: category
            });
        } catch (error) {
            setSaveMessage('Failed to save BMI data');
        }
    };

    const getBMICategory = (bmiValue) => {
        if (bmiValue < 18.5) return 'Underweight - You may be at risk of health issues due to insufficient body weight.';
        else if (bmiValue < 25) return 'Normal weight - You have a healthy body weight for your height.';
        else if (bmiValue < 30) return 'Overweight - You may be at risk of health issues due to excess body weight.';
        else return 'Obesity - You are at a significantly higher risk of health issues due to excess body weight.';
    };

    const clearInputs = () => {
        setWeight('');
        setHeight('');
        setBMI(null);
        setBMICategory('');
        setSaveMessage('');
    };

    return (
        <div className="bmi-calculator">
            <h2><BiCalculator /> BMI Calculator</h2>
            <p>
                Body Mass Index (BMI) is a measure of body fat based on height and weight that applies to adult men and women.
                It is commonly used to classify individuals as underweight, normal weight, overweight, or obese.
            </p>
            <p>
                BMI is calculated by dividing a person's weight in kilograms by the square of their height in meters.
                The formula is BMI = weight (kg) / (height (m) * height (m)).
            </p>
            <div className="input-container">
                <label>Weight ({unitSystem === 'metric' ? 'kg' : 'lbs'}):</label>
                <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
            </div>
            <div className="input-container">
                <label>Height ({unitSystem === 'metric' ? 'cm' : 'in'}):</label>
                <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
            </div>
            <div className="unit-selector">
                <label>
                    Unit System:
                    <select value={unitSystem} onChange={(e) => setUnitSystem(e.target.value)}>
                        <option value="metric">Metric</option>
                        <option value="imperial">Imperial</option>
                    </select>
                </label>
            </div>
            <div className="button-container">
                <button className="button" onClick={calculateBMI}>Calculate BMI</button>
                <button className="button" onClick={clearInputs}><BiReset /> Clear</button>
            </div>
            { saveMessage && <p className="save-message">{saveMessage}</p> }
            { bmi && (
                <div className="result">
                    <h3>Your BMI is: {bmi}</h3>
                    <p>Interpretation: {bmiCategory}</p>
                </div>
            )}
        </div>
    );
};

export default BMICalculator;
