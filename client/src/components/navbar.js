// REQUIRES MAJOR REWORK
import React, { useState } from "react";
import { Navbar, Nav, Container, Modal, Tab } from "react-bootstrap";
import { Navi, NaviItem, Dropdown } from "./navi";
import SignUpForm from "./SignupForm";
import Login from "./login";
import Auth from "../utils/auth";

// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
import logo from '../imgs/scrappiw.png'

// We import NavLink to utilize the react router.
import { NavLink, Link } from "react-router-dom";

// Here, we display our Navbar
export default function AppNavbar() {
  const [showModal, setShowModal] = useState(false);
  const colorize = {
    
    color: 'red',
  }
  const box = {
    background: 'black',
    color: 'white',
    position: 'absolute',
    top: '58px',
    right: '00px',
    width: '200px',
    borderRadius: '1rem',
    border: '2px solid black'


    
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
    
    
    background: 'black',
    height: '5rem'
  }

  return (
    // NAV BAR: TODO: ADD LINKS FOR SIGN IN LOGIN
    
    <div  >
      <Navbar className="px-3 navbar justify-content-between" style={color}  >
        {/* THIS IS THE HOME BUTTON, CLICKING THIS SHOULD TAKE A USER TO THE HOMESCREEN */}
        <NavLink className="navbar-brand justify-content-between" to="/">
          {/* change icon */}
          <img
            style={{ width:'17rem'}}
            src={logo}
            alt="ourLogo"
          ></img>
        </NavLink>

        {/* FORMAT THESE - MAKE HORIZONTAL */}
        <Navi>
          
        <NaviItem symbol=" " >
          
         <div className='flex-end py-2 mx-2 fader' style={box}>   
              <div className='col'>
              <NavLink  className="nav-link hove" style={statica}to="/create">
                Create Record
              </NavLink>
              </div>
              <Navbar.Collapse  className="col hove" style={statica} id="navbar">
                <Nav className="ml-auto">
                  {/* if user is logged in show saved books and logout */}
                  {Auth.loggedIn() ? (
                    <>
                      
                    <Nav.Link style={whiteText} onClick={Auth.logout}>Logout</Nav.Link>
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
              <Nav fill variant="tabs">
                <Nav.Item >
                  <Nav.Link eventKey="login" className='logsign' >Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="signup" className='logsign'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey="login" >
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
