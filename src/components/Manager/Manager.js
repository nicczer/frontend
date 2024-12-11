import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Manager.css';

function Manager() {
    const [policies, setPolicies] = useState([]);
    const [applications, setApplications] = useState([]);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [formData, setFormData] = useState({
        policyName: '',
        policyType: '',
        termsAndConditions: '',
        premium: ''
    });

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/applications/pending"); //Replace with your endpoint
                if (!response.ok) {
                    throw new Error("Failed to fetch applications.");
                }
                const data = await response.json();
                setApplications(data);
                setError("");
            } catch (err) {
                setError(err.message);
            }
        };
        fetchApplications();
    }, []);

    const handleApprove = async (applicationId) => {
        try {
            const response = await fetch(
                'http://localhost:8080/api/applications/${applicationId}/approve', // Replace with your endpoint
                { method : "POST"}
            );
            if (!response.ok) {
                throw new Error("Failed to approve the application.");
            }
            setSuccessMessage('Application ${applicationId} approved successfully!');
            setApplications(applications.filter((app) => app.id !== applicationId));
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDecline = async (applicationId) => {
        try {
            const response = await fetch(
                'http://localhost:8080/api/applications/${applicationId}/decline', //Replace with your endpoint
                { method : "POST" }
            );
            if (!response.ok) {
                throw new Error("Failed to decline the application.");
            }
            setSuccessMessage('Application ${applicationId} declined successfully!');
            setApplications(applications.filter((app) => app.id !== applicationId));
        } catch (err) {
            setError(err.message);
        }
    };

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
            <h1>Manager Portal</h1>
            <p>Here you can review policy applications, view available policies, or create a new policy.</p>
            <div className="application-container">
                <h2>Policy Applications</h2>
                {error && <p className="error-message">{error}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}

                {applications.length == 0 ? (
                    <p>No pending applications to review.</p>
                ) : (
                    <table className="applications-table">
                        <thread>
                            <tr>
                                <th>Application ID</th>
                                <th>Customer ID</th>
                                <th>Policy Type</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thread>
                        <tbody>
                            {applications.map((app) => (
                                <tr key={app.id}>
                                    <td>{app.customerId}</td>
                                    <td>{app.policyType}</td>
                                    <td>{app.status}</td>
                                    <td>
                                        <button
                                            className="approve-button"
                                            onClick={() => handleApprove(app.id)}
                                        >
                                            Approve
                                        </button>
                                        <button
                                            className="decline-button"
                                            onClick={() => handleDecline(app.id)}
                                        >
                                            Decline
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <h2>Current Policies</h2>
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

            <h2 className="form-title">Create a New Policy</h2>
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
