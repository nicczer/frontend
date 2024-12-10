import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home/Home";
import Customer from "./components/Customer/Customer";
import Manager from "./components/Manager/Manager";
import "./App.css";

//function App() {
//    return (
//        <Router>
//            <div className="main-content">
//                <Routes>
//                    <Route path="/" element={<Home />} />
//                    <Route path="/customer" element={<CustomerWithNavbar />} />
//                    <Route path="/manager" element={<ManagerWithNavbar />} />
//                </Routes>
//            </div>
//        </Router>
//    );
//}
//
//function Navbar() {
//    return (
//        <nav className="modern-navbar">
//            <ul className="nav-links">
//                <li><Link to="/" className="nav-link">Home</Link></li>
//                <li><Link to="/customer">Customer Portal</Link></li>
//                <li><Link to="/manager">Manager Portal</Link></li>
//            </ul>
//        </nav>
//    );
//}
//
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
                    </nav>
                </header>
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/customer" element={<Customer />} />
                        <Route path="/manager" element={<Manager />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

//function Navbar() {
//    return (
//        <nav className="modern-navbar">
//            <ul className="customer-links">
//                <li><Link to="/customer/" className="nav-link">Application</Link></li>
//                <li><Link to="/customer/Status">Customer Status</Link></li>
//                <li><Link to="/customer/Policies">Policies</Link></li>
//            </ul>
//        </nav>
//    );
//}
//
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

export default App;
