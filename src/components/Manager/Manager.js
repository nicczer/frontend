import React, { useState, useEffect } from 'react';
import './Manager.css';

function ManagerPortal() {
    const [policies, setPolicies] = useState([]);
    const [newPolicy, setNewPolicy] = useState({
        name: '',
        type: '',
        premium: '',
    });
    const [customerId, setCustomerId] = useState('');
    const [actionMessage, setActionMessage] = useState('');

    // Fetch
    useEffect(() => {
        fetch('http://localhost:8080/api/policies') // Replace with your actual backend endpoint
            .then((response) => response.json())
            .then((data) => setPolicies(data))
            .catch((error) => console.error('Error fetching policies:', error));
    }, []);

    // Handle input for new policy
    const handleNewPolicyChange = (e) => {
        const { name, value } = e.target;
        setNewPolicy((prev) => ({ ...prev, [name]: value }));
    };

    // Add new policy
    const handleAddPolicy = (e) => {
        e.preventDefault();
        fetch('http://localhost:8080/api/policies', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPolicy),
        })
            .then((response) => {
                if (response.ok) {
                    setPolicies((prevPolicies) => [...prevPolicies, newPolicy]);
                    setNewPolicy({ name: '', type: '', premium: '' });
                    alert('Policy added successfully!');
                } else {
                    alert('Failed to add policy.');
                }
            })
            .catch((error) => {
                console.error('Error adding policy:', error);
            });
    };

    // Handle input for Customer ID (new functionality)
    const handleInputChange = (e) => {
        setCustomerId(e.target.value);
    };

    const handlePolicyAction = (action) => {
        if (!customerId) {
            setActionMessage('Please enter a valid Customer ID.');
            return;
        }

        const apiUrl = `http://localhost:8080/api/policies/${customerId}/${action.toLowerCase()}`;
        fetch(apiUrl, {
            method: 'POST',
        })
            .then((response) => {
                if (response.ok) {
                    setActionMessage(`Policy successfully ${action.toLowerCase()}d.`);
                    setPolicies((prevPolicies) =>
                        prevPolicies.map((policy) =>
                            policy.customerId === customerId ? { ...policy, approvalStatus: action } : policy
                        )
                    );
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

            {/*Add New Policy */}
            <form className="modern-form" onSubmit={handleAddPolicy}>
                <h2>Add New Policy</h2>
                <div className="form-group">
                    <label htmlFor="name">Policy Name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={newPolicy.name}
                        onChange={handleNewPolicyChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="type">Policy Type</label>
                    <input
                        id="type"
                        name="type"
                        type="text"
                        value={newPolicy.type}
                        onChange={handleNewPolicyChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="premium">Policy Premium</label>
                    <input
                        id="premium"
                        name="premium"
                        type="number"
                        value={newPolicy.premium}
                        onChange={handleNewPolicyChange}
                        required
                    />
                </div>
                <button type="submit" className="form-button">
                    Add Policy
                </button>
            </form>

            {/*Display Policies */}
            <table className="modern-table">
                <thead>
                    <tr>
                        <th>Policy ID</th>
                        <th>Policy Name</th>
                        <th>Type</th>
                        <th>Premium</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {policies.map((policy) => (
                        <tr key={policy.id}>
                            <td>{policy.id}</td>
                            <td>{policy.name}</td>
                            <td>{policy.type}</td>
                            <td>{policy.premium}</td>
                            <td>{policy.approvalStatus}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* New Functionality: Approve/Deny Form */}
            <div className="policy-action-form">
                <h2>Approve or Deny Policy</h2>
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
