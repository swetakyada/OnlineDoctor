import React, { Component } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dashboard.css";
import { FaUserCircle } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";

var username = localStorage.getItem("name");
console.log(localStorage.getItem("id"));

export default class NavBar extends Component {
  render() {
    return (
      <Navbar>
        <Container>
          <Navbar.Brand>
            <Nav.Link href="/dashboard">Online Doctor</Nav.Link>
          </Navbar.Brand>
          <Nav.Item>
            <Nav.Link href="/chats">Your Chat</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/appointments">Appointments</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              href="/login"
              onClick={(e) => {
                localStorage.removeItem("id");
                localStorage.removeItem("name");
                localStorage.removeItem("email");
              }}
            >
              Logout
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <LinkContainer to="/dashboard">
              <Nav.Link to="dashboard">
                <FaUserCircle /> {"Hello " + username}
              </Nav.Link>
            </LinkContainer>
          </Nav.Item>
        </Container>
      </Navbar>
    );
  }
}
