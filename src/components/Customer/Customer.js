import React, { useState } from 'react';
import './Customer.css';

function CustomerForm() {
    const [formData, setFormData] = useState({
        customerName: '',
        policyType: '',
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
        <div className="customer-form-container">
            <h1>Customer Portal</h1>
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
                <button type="submit" className="form-button">Submit</button>
            </form>
        </div>
    );
}

export default CustomerForm;

