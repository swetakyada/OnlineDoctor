import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import "./Profile.css";
import Navbar from "../Dashboard/Navbar";
import axios from "axios";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const id = user.id;
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    console.log(email);
    localStorage.setItem(
      "user",
      JSON.stringify({
        id: id,
        name: name,
        email: email,
      })
    );
  }, [update]);

  const handleSubmit = async (event) => {
    try {
      if (name && email) {
        console.log(name, " ", email);
        axios
          .post(
            "http://localhost:5000/user/edit",
            { id: id, name: name, email: email },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            console.log(response.data);
            if (response.data.status === "ok") {
              setUpdate(!update);
              alert("Information Updated!!");
            } else {
              alert(response.data.error);
            }
          });
      }
    } catch (error) {
      console.log(error);
      alert("Error occured!!");
    }
  };

  return (
    <div>
      <Navbar />
      <Row>
        <Col className="account1">
          <div>
            <form className="account-form" onSubmit={() => handleSubmit()}>
              <div>
                <h3>Profile</h3>
              </div>
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
              <div className=" d-flex justify-content-center">
                <button className="submit" type="submit">
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

export default Profile;
