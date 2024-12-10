import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Customer from './components/Customer/Customer';
import Manager from './components/Manager/Manager';
import './App.css';

function Navbar() {
    return (
        <nav className="modern-navbar">
            <ul className="nav-links">
                <li><Link to="/customer">Customer Portal</Link></li>
                <li><Link to="/manager">Manager Portal</Link></li>
            </ul>
        </nav>
    );
}

function App() {
    return (
        <Router>
            <div className="main-content">
                <Routes>
                    <Route path="/customer" element={<CustomerWithNavbar />} />
                    <Route path="/manager" element={<ManagerWithNavbar />} />
                </Routes>
            </div>
        </Router>
    );
}

function CustomerWithNavbar() {
    return (
        <div className="modern-form">
            <Navbar />
            <div className="form-content">
                <Customer />
            </div>
        </div>
    );
}

function ManagerWithNavbar() {
    return (
        <div className="modern-form">
            <Navbar />
            <div className="form-content">
                <Manager />
            </div>
        </div>
    );
}

export default App;
