import React, { useState, useEffect } from "react";
import { Navbar, Container, Card, Button, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dashboard.css";
import { FaUserCircle } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";

var dname = localStorage.getItem("dname");
export default function Dashboard() {
  const [Appointments, SetAppointments] = useState("");
  var doctorid = localStorage.getItem("did");

  useEffect(() => {
    const fecthData = () => {
      fetch("http://localhost:5000/appointment/d_get", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          doctorid,
        }),
      }).then((response) =>
        response.json().then((data) => {
          console.log(data);
          SetAppointments(data);
        })
      );
    };
    fecthData();
  }, []);

  return (
    <div>
      <Navbar>
        <Container>
          <Navbar.Brand>
            <Nav.Link href="/dashboard">Online Doctor</Nav.Link>
          </Navbar.Brand>
          <Nav.Item>
            <Nav.Link href="/dashboard">Your Chat</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/profile">Profile</Nav.Link>
          </Nav.Item>
          <Nav.Item>

            <Nav.Link
              href="/login"
            // onClick={(e) => {
            //   localStorage.removeItem("did");
            //   localStorage.removeItem("dname");
            //   localStorage.removeItem("demail");
            // }}
            >
              Logout
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <LinkContainer to="/Profile">
              <Nav.Link to="Profile">
                <FaUserCircle />
                {" Hello " + dname}
              </Nav.Link>
            </LinkContainer>
          </Nav.Item>
        </Container>
      </Navbar>
      <br />
      <div>
        <center>
          <h5></h5>
          <h4 className="pb-3">Your Appointments</h4>
        </center>
        <div className="appointment-card">
          <div className="appointments">
            {Object.keys(Appointments)
              .filter((key) => key)
              .map((key, index) => {
                return (
                  <div>
                    <Card>
                      <Card.Body>
                        <Card.Title>
                          Patient Name : {Appointments[key].patientName}
                        </Card.Title>
                        <Card.Text>
                          Illness : {Appointments[key].description}
                          <br />
                          Date: {Appointments[key].date}
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
                    <br />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
