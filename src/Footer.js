import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import './Footer.css';

class Footer extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand className="author" >&copy; Anthony Keith 2023</Navbar.Brand>
        <Navbar.Brand className="author" >&copy; Nate Brown 2023</Navbar.Brand>
        <Navbar.Brand className="author" >&copy; Ryan Bagan 2023</Navbar.Brand>
        <Navbar.Brand className="author" >&copy; Deon Curry 2023</Navbar.Brand>
      </Navbar>
    )
  }
}

export default Footer;
