import React from "react";
import "../App.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img
          src="/logo.png"
          alt="Logo"
        />
        Healthy Recipes
      </div>
      <ul className="navbar-links">
        <li>
          <a
            href="/"
            className="active"
          >
            Home
          </a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/recipes">Recipes</a>
        </li>
      </ul>
      <button className="browse-btn">Browse recipes</button>
    </nav>
  );
}

export default Navbar;
