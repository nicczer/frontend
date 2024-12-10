import React, { useState } from 'react';
import './Customer.css';

function CustomerForm() {
    const [formData, setFormData] = useState({
        customerName: '',
        policyType: '',
        policyId: '', // New Policy ID field
        customerDisease: 'No', // Default to "No"
        customerSurgery: 'No' // Default to "No"
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData); // Replace with your API call
        alert('Form submitted!');
    };

    return (
        <div className="customer-container">
            <h1>Customer Portal</h1>
            <h2>Apply Insurance</h2>
            <form className="modern-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="customerName">Customer Name</label>
                    <input
                        id="customerName"
                        name="customerName"
                        type="text"
                        placeholder="Enter customer name"
                        value={formData.customerName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="dateOfBirth">Date of Birth (yyyy-mm-dd)</label>
                    <input
                        id="dateOfBirth"
                        name="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="customerEmail">Customer E-mail Address</label>
                    <input
                        id="customerEmail"
                        name="customerEmail"
                        type="text"
                        placeholder="Enter customer e-mail address"
                        value={formData.customerEmail}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="customerNumber">Customer Contact Number</label>
                    <input
                        id="customerNumber"
                        name="customerNumber"
                        type="number"
                        placeholder="Enter customer contact number"
                        value={formData.customerNumber}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="policyType">Policy Type</label>
                    <input
                        id="policyType"
                        name="policyType"
                        type="text"
                        placeholder="Enter policy type"
                        value={formData.policyType}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="policyId">Policy ID</label>
                    <input
                        id="policyId"
                        name="policyId"
                        type="text"
                        placeholder="Enter policy ID"
                        value={formData.policyId}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="customerDisease">Customer Disease</label>
                    <select
                        id="customerDisease"
                        name="customerDisease"
                        value={formData.customerDisease}
                        onChange={handleInputChange}
                    >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="customerSurgery">Customer Surgery</label>
                    <select
                        id="customerSurgery"
                        name="customerSurgery"
                        value={formData.customerSurgery}
                        onChange={handleInputChange}
                    >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="policyID">Policy ID</label>
                    <input
                        id="policyID"
                        name="policyID"
                        type="number"
                        placeholder="Enter policy ID"
                        value={formData.policyID}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit" className="form-button">Apply Insurance</button>
            </form>
        </div>
    );
}

export default CustomerForm;