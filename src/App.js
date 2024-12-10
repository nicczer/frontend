import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from "./components/Home";
import Customer from './components/Customer/Customer';
import Manager from './components/Manager/Manager';
import './App.css';

//function Navbar() {
//    return (
//        <nav className="modern-navbar">
//            <ul className="nav-links">
//                <li><Link to="/customer">Customer Portal</Link></li>
//                <li><Link to="/manager">Manager Portal</Link></li>
//            </ul>
//        </nav>
//    );
//}

//function App() {
//    return (
//        <Router>
//            <div className="main-content">
//                <Routes>
//                    <Route path="/customer" element={<CustomerWithNavbar />} />
//                    <Route path="/manager" element={<ManagerWithNavbar />} />
//                </Routes>
//            </div>
//        </Router>
//    );
//}

//function CustomerWithNavbar() {
//    return (
//        <div className="modern-form">
//            <Navbar />
//            <div className="form-content">
//                <Customer />
//            </div>
//        </div>
//    );
//}
//
//function ManagerWithNavbar() {
//    return (
//        <div className="modern-form">
//            <Navbar />
//            <div className="form-content">
//                <Manager />
//            </div>
//        </div>
//    );
//}

function App() {
    return (
        <Router>
            <div className="container">
                <header>
                    <h1> Insurance Management Application</h1>
                    <nav className="navigation">
                        <Link to="/" className="nav-link">Home</Link>
                        <Link to="/customer" className="nav-link">Customer</Link>
                        <Link to="/manager" className="nav-link">Manager</Link>
                    <nav>
                </header>
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/" element={<Home />} />
                    <Routes>
                <main>
            </div>
        </Router>
    );
}

export default App;
