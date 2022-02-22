import React, { Component } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dashboard.css";
import { FaUserCircle } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";

export default class NavBar extends Component {
  render() {
    return (
      <Navbar>
        <Container>
          <Navbar.Brand>
            {" "}
            <Nav.Link href="/home">Online Doctor</Nav.Link>
          </Navbar.Brand>
          <Nav.Item>
            <Nav.Link href="/home">Your Chat</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/home">About Us</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/home">Appointments</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/home">Logout</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <LinkContainer to="/profile">
              <Nav.Link to="profile">
                <FaUserCircle />
              </Nav.Link>
            </LinkContainer>
          </Nav.Item>
        </Container>
      </Navbar>
    );
  }
}
