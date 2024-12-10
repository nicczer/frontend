import React, { useState } from 'react';
import './Manager.css';

function ManagerPortal() {
    const [customerId, setCustomerId] = useState('');
    const [actionMessage, setActionMessage] = useState('');

    const handleInputChange = (e) => {
        setCustomerId(e.target.value);
    };

    const handlePolicyAction = (action) => {
        if (!customerId) {
            setActionMessage('Please enter a valid Customer ID.');
            return;
        }

        // Replace this URL with your actual backend API endpoint
        const apiUrl = `http://localhost:8080/api/policies/${customerId}/${action.toLowerCase()}`;

        fetch(apiUrl, {
            method: 'POST',
        })
            .then((response) => {
                if (response.ok) {
                    setActionMessage(`Policy successfully ${action.toLowerCase()}d.`);
                } else {
                    setActionMessage('Failed to perform the action. Please check the Customer ID.');
                }
            })
            .catch(() => {
                setActionMessage('An error occurred. Please try again.');
            });
    };

    return (
        <div className="manager-portal">
            <h1>Manager Portal</h1>
            <div className="policy-action-form">
                <label htmlFor="customerId">Enter Customer ID:</label>
                <input
                    type="text"
                    id="customerId"
                    placeholder="Enter Customer ID"
                    value={customerId}
                    onChange={handleInputChange}
                />
                <div className="action-buttons">
                    <button onClick={() => handlePolicyAction('Approve')}>Approve</button>
                    <button onClick={() => handlePolicyAction('Deny')}>Deny</button>
                </div>
                {actionMessage && <p className="action-message">{actionMessage}</p>}
            </div>
        </div>
    );
}

export default ManagerPortal;
