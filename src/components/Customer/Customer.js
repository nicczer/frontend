import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Customer.css';

function Customer() {
    const [policies, setPolicies] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        dateOfBirth: '',
        email: '',
        phoneNumber: '',
        policyType: ''
    });

    useEffect(() => {
        axios.get('/api/insurance/policies')
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

    const applyPolicy = () => {
        axios.post('/api/insurance/apply', formData)
            .then((response) => {
                alert('Policy applied successfully!');
            })
            .catch((error) => {
                console.error('Error applying for policy:', error);
                alert('Failed to apply for policy. Please try again.');
            });
    };

    return (
        <div className="customer-container">
            <h1>Available Policies</h1>
            <table className="modern-table">
                <thead>
                    <tr>
                        <th>Policy Name</th>
                        <th>Policy Type</th>
                        <th>Premium</th>
                    </tr>
                </thead>
                <tbody>
                    {policies.map((policy) => (
                        <tr key={policy.policyId}>
                            <td>{policy.policyName}</td>
                            <td>{policy.policyType}</td>
                            <td>{policy.premium}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2 className="form-title">Apply for a Policy</h2>
            <form className="modern-form" onSubmit={(e) => { e.preventDefault(); applyPolicy(); }}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input id="name" name="name" type="text" placeholder="Enter your name" onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="dateOfBirth">Date of Birth</label>
                    <input id="dateOfBirth" name="dateOfBirth" type="date" onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" placeholder="Enter your email" onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input id="phoneNumber" name="phoneNumber" type="text" placeholder="Enter your phone number" onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="policyType">Policy Type</label>
                    <input id="policyType" name="policyType" type="text" placeholder="Enter policy type" onChange={handleInputChange} required />
                </div>
                <button type="submit" className="form-button">Submit</button>
            </form>
        </div>
    );
}

export default Customer;
