// REQUIRES MAJOR REWORK
import React, { useState } from "react";
import { Navbar, Nav, Container, Modal, Tab } from "react-bootstrap";
import SignUpForm from "./SignupForm";
import Login from "./login";
import Auth from "../utils/auth";

// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

// We import NavLink to utilize the react router.
import { NavLink, Link } from "react-router-dom";

// Here, we display our Navbar
export default function AppNavbar() {
  const [showModal, setShowModal] = useState(false);

  return (
    // NAV BAR: TODO: ADD LINKS FOR SIGN IN LOGIN
    <div>
      <Navbar className="navbar navbar-expand-lg navbar-light bg-light">
        {/* THIS IS THE HOME BUTTON, CLICKING THIS SHOULD TAKE A USER TO THE HOMESCREEN */}
        <NavLink className="navbar-brand" to="/">
          <img
            style={{ width: 25 + "%" }}
            src="https://d3cy9zhslanhfa.cloudfront.net/media/3800C044-6298-4575-A05D5C6B7623EE37/4B45D0EC-3482-4759-82DA37D8EA07D229/webimage-8A27671A-8A53-45DC-89D7BF8537F15A0D.png"
            alt="MongoDB Logo"
          ></img>
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
              {/* <NavLink className="nav-link" to="/login">
                Login
              </NavLink> */}
              <Navbar.Collapse id="navbar">
                <Nav className="ml-auto">
                  {/* if user is logged in show saved books and logout */}
                  {Auth.loggedIn() ? (
                    <>
                      <Nav.Link as={Link} to="/saved">
                        See Your Books
                      </Nav.Link>
                      <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                    </>
                  ) : (
                    <Nav.Link onClick={() => setShowModal(true)}>
                      Login/Sign Up
                    </Nav.Link>
                  )}
                </Nav>
              </Navbar.Collapse>
            </li>
          </ul>
        </div>
      </Navbar>
      <Modal
        size="lg"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="signup-modal"
      >
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey="login">
          <Modal.Header closeButton>
            <Modal.Title id="signup-modal">
              <Nav variant="pills">
                <Nav.Item>
                  <Nav.Link eventKey="login">Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="signup">Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey="login">
                <Login handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey="signup">
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </div>
  );
}
