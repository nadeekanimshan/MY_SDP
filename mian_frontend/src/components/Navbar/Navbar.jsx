import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';

import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

import { assest } from '../../assest/assest';

const CustomNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = (path) => {
    if (path.startsWith("#")) {
      window.location.href = path;
    } else {
      navigate(path);
    }
    setIsMenuOpen(false);
  };

  const handleButtonClick = () => {
    navigate('/signup');
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar fixed-top">
        <Container fluid>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <img
              src={assest.expo}
              alt="Logo"
              className='logo me-2'
            />
            <span className="brand-text">AUDIO DIARY</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleToggle} />
          <Navbar.Collapse id="basic-navbar-nav" in={isMenuOpen}>
            <Nav className="mx-auto custom-nav">
              <Nav.Link onClick={() => handleLinkClick('/')}>Home</Nav.Link>
              <Nav.Link onClick={() => handleLinkClick('#footer')}>SERVICES</Nav.Link>
              <Nav.Link onClick={() => handleLinkClick('#about')}>ABOUT</Nav.Link>
              <Nav.Link onClick={() => handleLinkClick('#footer')}>CONTACT</Nav.Link>
            </Nav>
            <Button 
              variant="outline-light" 
              className="btn-e-magazine ms-lg-3" 
              onClick={handleButtonClick}
            >
              Apply Now
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {isMenuOpen && <div className="overlay" onClick={handleToggle}></div>}
    </>
  );
};

export default CustomNavbar;