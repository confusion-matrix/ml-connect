// REQUIRES MAJOR REWORK
import React, { useState } from "react";
import { Navbar, Nav, Container, Modal, Tab } from "react-bootstrap";
import { Navi, NaviItem, Dropdown } from "./navi";
import SignUpForm from "./SignupForm";
import Login from "./login";
import Auth from "../utils/auth";

// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
import logo from '../imgs/scrappi.png'

// We import NavLink to utilize the react router.
import { NavLink, Link } from "react-router-dom";

// Here, we display our Navbar
export default function AppNavbar() {
  const [showModal, setShowModal] = useState(false);
  const colorize = {
    background: 'black',
    color: 'white',
  }
  const box = {
    background: 'black',
    color: 'white',
    position: 'absolute',
    top: '58px',
    right: '00px',
    width: '200px',
    borderRadius: '1rem'


    
  }
 
  const bRadius = {
    borderRadius: '1rem'
  }
  const statica = {
    maxWidth: "100%",
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    color: 'white',
  }
  const whiteText ={
    color: 'white'
  }
  const color = {
    
    
    background: 'linear-gradient(351deg, rgba(119,119,119,1) 0%, rgba(170,170,170,1) 48%, rgba(157,157,157,1) 100%)',
    height: '5rem'
  }

  return (
    // NAV BAR: TODO: ADD LINKS FOR SIGN IN LOGIN
    
    <div  >
      <Navbar className="px-5 navbar justify-content-between" style={color}  >
        {/* THIS IS THE HOME BUTTON, CLICKING THIS SHOULD TAKE A USER TO THE HOMESCREEN */}
<<<<<<< HEAD
        <NavLink className="navbar-brand" to="/">
          <img style={{ "width": 25 + '%' }} src="https://onlinejpgtools.com/images/examples-onlinejpgtools/random-grid.jpg"></img>
=======
        <NavLink className="navbar-brand justify-content-between" to="/">
          {/* change icon */}
          <img
            style={{ width:'17rem'}}
            src={logo}
            alt="ourLogo"
          ></img>
>>>>>>> b28964bd28ae962890f4cab78e9180267c9f16ae
        </NavLink>

        {/* FORMAT THESE - MAKE HORIZONTAL */}
        <Navi>
        <NaviItem symbol="⚫️" className="butt" >
         <div className='flex-end'style={box}>   
              <div className='col'>
              <NavLink  className="nav-link hove" style={statica}to="/create">
                Create Record
              </NavLink>
<<<<<<< HEAD
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
=======
              </div>
              <Navbar.Collapse  className="col hove" style={statica}id="navbar">
                <Nav className="ml-auto">
                  {/* if user is logged in show saved books and logout */}
                  {Auth.loggedIn() ? (
                    <>
                      
                    <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                    </>
                  ) : (
                    <Nav.Link style={whiteText} onClick={() => setShowModal(true)}>
                      Login/Sign Up
                    </Nav.Link>
                  )}
                </Nav>
              </Navbar.Collapse>
        </div> 
          </NaviItem>
      </Navi>
       
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
>>>>>>> b28964bd28ae962890f4cab78e9180267c9f16ae
    </div>
  );
}
