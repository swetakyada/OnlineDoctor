import React from "react";
import { Navbar, Card, Button, Nav } from "react-bootstrap";
import "./Profile.css";
// import jwt from "jsonwebtoken";

const Profile = () => {
  // const token = localStorage.getItem("token");
  // const user = jwt.decode(token);
  // if (!user) {
  //   localStorage.removeItem("token");
  //   window.location("/login");
  // }

  return (
    <div>
      <Navbar className="profile-container ">
        <Navbar.Brand>
          {" "}
          <Nav.Link href="/dashboard">Online Doctor</Nav.Link>
        </Navbar.Brand>
      </Navbar>

      <center>
        <h5 className="pt-3">Welcome Sweta!</h5>
        <h4 className="pb-3">Your Appointments</h4>
      </center>
      <div className="appointment-card">
        <div className="appointments">
          <Card>
            <Card.Body>
              <Card.Title>Doctor Name : Dr. Amit Patel</Card.Title>
              <Card.Text>
                Speciality : Psychologist
                <br />
                Time : 3PM
              </Card.Text>
              <center>
                {" "}
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
  );
};
export default Profile;
