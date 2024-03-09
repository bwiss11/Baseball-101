import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="nav">
      <ul>
        <li>
          <Link to="/" className="home-icon">
            Home
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
