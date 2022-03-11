import React, { useState } from "react";
import "./Profile.css";
import { Row, Col } from "react-bootstrap";
import { Navbar, Container, Card, Button, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dashboard.css";
import { FaUserCircle } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";

const DoctorProfile = () => {
  var doctor = JSON.parse(localStorage.getItem("doctor"));
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const handleSubmit = async (event) => {
    try {
      if (
        !(
          name &&
          email &&
          speciality &&
          description &&
          password &&
          cpassword &&
          password === cpassword
        )
      ) {
        alert("Invalid input");
        return;
      }
      console.log(name, " ", email, " ", password);
      const response = await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          speciality,
          description,
          password,
        }),
      });

      const data = await response.json();

      if (data.status === "ok") {
        alert("User registered successfully!!");
      } else {
        alert("Falied to create the user");
      }
    } catch (error) {
      console.log(error);
      alert("Error occured!!");
    }
  };

  return (
    <div>
      <Navbar>
        <Container>
          <Navbar.Brand>
            <Nav.Link href="/doctor/dashboard">Online Doctor</Nav.Link>
          </Navbar.Brand>
          <Nav.Item>
            <Nav.Link href="/doctor/chats">Your Chat</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              href="/doctor/login"
              onClick={(e) => {
                localStorage.removeItem("doctor");
              }}
            >
              Logout
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <LinkContainer to="/doctor/profile">
              <Nav.Link to="/doctor/profile">
                <FaUserCircle />
                {" Hello " + doctor.name}
              </Nav.Link>
            </LinkContainer>
          </Nav.Item>
        </Container>
      </Navbar>
      <Row>
        <Col className="account1">
          <div>
            <form className="account-form1" onSubmit={() => handleSubmit()}>
              <div>
                {" "}
                <h3>Profile</h3>
              </div>
              <div>
                Username
                <input
                  type="text"
                  placeholder="Username"
                  className="input"
                  value={doctor.name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                Email
                <input
                  type="text"
                  placeholder="Email"
                  className="input"
                  value={doctor.email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                Speciality
                <input
                  type="text"
                  placeholder="Speciality"
                  className="input"
                  value={doctor.speciality}
                  onChange={(e) => setSpeciality(e.target.value)}
                />
              </div>
              <div>
                Description
                <input
                  type="text"
                  placeholder="Description"
                  className="input"
                  value={doctor.description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div>
                Old Password
                <input
                  type="password"
                  placeholder="Password"
                  className="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                New Password
                <input
                  type="password"
                  placeholder="Password"
                  className="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                Confirm New Password
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="input"
                  value={cpassword}
                  onChange={(e) => setCpassword(e.target.value)}
                />
              </div>
              <div className="d-flex justify-content-center">
                {" "}
                <button className="submit " type="submit">
                  Save
                </button>
              </div>
            </form>
          </div>
        </Col>
        {/* <Col className="bg">
                    <div>

                    </div>
                </Col> */}
      </Row>
    </div>
  );
};

export default DoctorProfile;
