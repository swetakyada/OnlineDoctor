import React, { Component } from "react";
import { Navbar, Container, Card, Button, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dashboard.css";
import { FaUserCircle } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";

export default function Dashboard() {
  return (
    <div>
      <Navbar>
        <Container>
          <Navbar.Brand>
            <Nav.Link href="/home">Online Doctor</Nav.Link>
          </Navbar.Brand>
          <Nav.Item>
            <Nav.Link href="/home">Your Chat</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/home">Logout</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <LinkContainer to="/Profile">
              <Nav.Link to="Profile">
                <FaUserCircle />
              </Nav.Link>
            </LinkContainer>
          </Nav.Item>
        </Container>
      </Navbar>
      <br />
      <div>
        <div className="appointment-card">
          <div className="appointments">
            <Card>
              <Card.Body>
                <Card.Title>Doctor Name : Dr. Amit Patel</Card.Title>
                <Card.Text>
                  Patient Name : shweta
                  <br />
                  Illness : Mental issues time: 3 PM 3 Apr 2022
                </Card.Text>
                <center>
                  <Button
                    style={{
                      backgroundColor: "#064420",
                      width: "120px",
                      fontSize: "18px",
                    }}
                  >
                    Start Now
                  </Button>
                </center>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
