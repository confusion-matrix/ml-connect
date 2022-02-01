// REQUIRES MAJOR REWORK

import React from "react";

// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";

// Here, we display our Navbar
export default function Navbar() {
  return (
    // NAV BAR: TODO: ADD LINKS FOR SIGN IN LOGIN
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">

        {/* THIS IS THE HOME BUTTON, CLICKING THIS SHOULD TAKE A USER TO THE HOMESCREEN */}
        <NavLink className="navbar-brand" to="/">
          <img style={{ "width": 25 + '%' }} src="https://onlinejpgtools.com/images/examples-onlinejpgtools/random-grid.jpg"></img>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* FORMAT THESE - MAKE HORIZONTAL */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              {/* ADD NAV LINKS HERE!!! LOGIN/SIGN UP - Follow process like CREATE */}
              <NavLink className="nav-link" to="/create">
                Create Record
              </NavLink>
              <NavLink className="nav-link" to="/login">
                Sign Up
              </NavLink>
              {/* Directely test user page */}
              <NavLink className="nav-link" to="/userPage">
                User Page
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}