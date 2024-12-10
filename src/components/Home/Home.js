import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
    return (
        <div className="home-container">
            <h1>Welcome to Team 2's Insurance Management application!</h1>
            <p>Select your role to continue:</p>
            <div className="role-links">
                <Link to="/customer" className="role-link">
                    Customer
                </Link>
                <Link to="/manager" className="role-link">
                    Manager
                </Link>
            </div>
        </div>
    );
}

export default Home;