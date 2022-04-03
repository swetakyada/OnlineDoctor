import React, { useState, useEffect } from "react";
import "./Profile.css";
import { Row, Col } from "react-bootstrap";
import { Navbar, Container, Card, Button, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dashboard.css";
import { FaUserCircle } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";

const DoctorProfile = () => {
  var doctor = JSON.parse(localStorage.getItem("doctor"));
  const id = doctor.id;
  const [name, setName] = useState(doctor.name);
  const [email, setEmail] = useState(doctor.email);
  const [speciality, setSpeciality] = useState(doctor.speciality);
  const [description, setDescription] = useState(doctor.description);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    console.log(email);
    localStorage.setItem(
      "doctor",
      JSON.stringify({
        id: id,
        name: name,
        email: email,
        speciality: speciality,
        description: description,
      })
    );
  }, [update]);

  const handleSubmit = async (event) => {
    try {
      if (name && email && speciality && description) {
        // console.log(name, " ", email);
        const response = await axios.post(
          "http://localhost:5000/doctor/edit",
          {
            id: id,
            name: name,
            email: email,
            speciality: speciality,
            description: description,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // console.log(response.data);
        if (response.data.status === "ok") {
          setUpdate(!update);
          alert("Information Updated!!");
        } else {
          alert(response.data.error);
        }
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
            <br />
            <form className="account-form1" onSubmit={() => handleSubmit()}>
              <div>
                <h3>Profile</h3>
              </div>
              <br />
              <div>
                Username
                <input
                  type="text"
                  placeholder="Username"
                  className="input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <br />
              <div>
                Email
                <input
                  type="text"
                  placeholder="Email"
                  className="input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <br />
              <div>
                Speciality
                <input
                  type="text"
                  placeholder="Speciality"
                  className="input"
                  value={speciality}
                  onChange={(e) => setSpeciality(e.target.value)}
                />
              </div>
              <br />
              <div>
                Description
                <input
                  type="text"
                  placeholder="Description"
                  className="input"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="d-flex justify-content-center">
                <button className="submit " type="submit">
                  Save
                </button>
              </div>
            </form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default DoctorProfile;
