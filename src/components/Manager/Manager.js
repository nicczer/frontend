import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Manager.css';

function Manager() {
    const [policies, setPolicies] = useState([]);
    const [formData, setFormData] = useState({
        policyName: '',
        policyType: '',
        termsAndConditions: '',
        premium: ''
    });

    useEffect(() => {
        axios.get('/api/insurance/customers')
            .then((response) => {
                setPolicies(response.data);
            })
            .catch((error) => {
                console.error('Error fetching policies:', error);
            });
    }, []);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const addPolicy = () => {
        axios.post('/api/insurance/policies', formData)
            .then((response) => {
                alert('Policy added successfully!');
                setPolicies([...policies, response.data]);
            })
            .catch((error) => {
                console.error('Error adding policy:', error);
                alert('Failed to add policy. Please try again.');
            });
    };

    return (
        <div className="manager-container">
            <h1> Policies</h1>
            <table className="modern-table">
                <thead>
                    <tr>
                        <th>Customer Name</th>
                        <th>Policy Type</th>
                        <th>Policy Status</th>
                    </tr>
                </thead>
                <tbody>
                    {policies.map((policy) => (
                        <tr key={policy.customerId}>
                            <td>{policy.name}</td>
                            <td>{policy.policyType}</td>
                            <td>{policy.policyStatus}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2 className="form-title">Add a New Policy</h2>
            <form className="modern-form" onSubmit={(e) => { e.preventDefault(); addPolicy(); }}>
                <div className="form-group">
                    <label htmlFor="policyName">Policy Name</label>
                    <input id="policyName" name="policyName" type="text" placeholder="Enter policy name" onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="policyType">Policy Type</label>
                    <input id="policyType" name="policyType" type="text" placeholder="Enter policy type" onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="termsAndConditions">Terms and Conditions</label>
                    <textarea id="termsAndConditions" name="termsAndConditions" type="text" placeholder="Enter terms and conditions" onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="premium">Premium</label>
                    <input id="premium" name="premium" type="number" placeholder="Enter premium amount" onChange={handleInputChange} required />
                </div>
                <button type="submit" className="form-button">Add Policy</button>
            </form>
        </div>
    );
}

export default Manager;
