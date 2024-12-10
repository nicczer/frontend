import React, { useState } from 'react';
import './Customer.css';

function CustomerForm() {
    const [formData, setFormData] = useState({
        customerName: '',
        dateOfBirth: '',
        customerEmail: '',
        customerNumber: '',
        policyType: '',
        policyId: '', // New Policy ID field
        customerDisease: 'No', // Default to "No"
        customerSurgery: 'No' // Default to "No"
    });

    const [policies, setPolicies] = useState([]);
    const [error, setError] = useState("");
    const [isListVisible, setIsListVisible] = useState(false);
    const [policyStatus, setPolicyStatus] = useState("");
    const [customerId, setCustomerId] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData); // Replace with your API call
        alert('Form submitted!');
    };

    const fetchPolicies = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/policies"); //Update with your backend endpoint
            if (!response.ok) {
                throw new Error("Failed to fetch policies.");
            }
            const data = await response.json();
            setPolicies(data);
            setError("");
        } catch (err) {
            setError(err.message);
        }
    };

    const handleShowPolicies = () => {
        setIsListVisible(true);
        console.log("fetch Policies"); //Replace with your API call to fetch policies
    }

    const fetchPolicyStatus = async () => {
        try {
            const response = await fetch(
                'http://localhost:8080/api/customers/${customerId}/status'
            ); //Update with your backend endpoint
            if (!response.ok) {
                throw new Error("Failed to fetch policy status.");
            }
            const data = await response.json();
            setPolicyStatus(data.policyStatus);
            setError("");
        } catch (err) {
            setError(err.message);
        }
     };

    const handleCheckStatus = (e) => {
        e.preventDefault();
        if (!customerId) {
            setError("Customer ID is required.");
            return;
        }
        fetchPolicyStatus();
    };

    return (
        <div className="customer-container">
            <h1>Customer Portal</h1>
            <p>Here you can check your policy status, view available policies, or apply for a new policy.</p>
            <div className="status-container">
                <h2>Check Policy Status</h2>
                <form onSubmit={handleCheckStatus}>
                    <label htmlFor="customerId">Enter Customer ID:</label>
                    <input
                        type="text"
                        id="customerId"
                        value={customerId}
                        onChange={(e) => setCustomerId(e.target.value)}
                        placeholder="e.g., 12345"
                        required
                    />
                    <button type="submit" className="check-status-button">
                        Check Status
                    </button>
                </form>
                {policyStatus && (
                    <p className="policy-status">
                        <strong>Policy Status:</strong> {policyStatus}
                    </p>
                )}
                {error && <p className="error-message">{error}</p>}
            </div>

            <div className="policies-container">
                <h2>View Insurance Policy List</h2>
                <button onClick={handleShowPolicies} className="show-policies-button">
                    Show Available Policies
                </button>
                {error && <p className="error-message">{error}</p>}
                {isListVisible && policies.length === 0 && !error && (
                    <p>Loading policies...</p>
                )}
                {isListVisible && policies.length > 0 && (
                    <ul className="policies-list">
                        {policies.map((policy) => (
                            <li key={policy.policyId} className="policy-item">
                                <h3>{policy.policyName}</h3>
                                <p>
                                    <strong>Premium:</strong> ${policy.premiumAmount}
                                </p>
                                <p>
                                    <strong>Duration:</strong> {policy.durationInYears} years
                                </p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <h2>Insurance Policy Application</h2>
            <form className="application-form" onSubmit={handleSubmit}>
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