import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import "./Profile.css";
import Navbar from "../Dashboard/Navbar";
import axios from "axios";

const Profile = () => {
  const id = JSON.parse(localStorage.getItem("user")).id;
  const [name, setName] = useState(
    JSON.parse(localStorage.getItem("user")).name
  );
  const [email, setEmail] = useState(
    JSON.parse(localStorage.getItem("user")).email
  );
  const [opassword, setOpassword] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    setUpdate(false);
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
      if (
        name !== JSON.parse(localStorage.getItem("user")).name ||
        email !== JSON.parse(localStorage.getItem("user")).email
      ) {
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
              setUpdate(true);
              alert("Information Updated!!");
            } else {
              alert(response.data.error);
            }
          });
      }

      if (opassword || password || cpassword) {
        if (opassword && password && cpassword) {
          if (password === cpassword) {
            axios
              .post(
                "http://localhost:5000/user/change",
                { id: id, opassword: opassword, password: cpassword },
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              )
              .then((response) => {
                console.log(response.data);
                if (response.data.status === "ok") {
                  alert("Password Changed!!");
                } else {
                  alert(response.data.error);
                }
              });
          } else {
            alert("password and confirm password does not match");
          }
        } else {
          alert("All password fields are required");
        }
      } else {
        alert("No change in Password");
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
                {" "}
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
              <div>
                Old Password
                <input
                  type="password"
                  placeholder="Password"
                  className="input"
                  value={opassword}
                  onChange={(e) => setOpassword(e.target.value)}
                />
              </div>
              <div>
                New Password
                <input
                  type="password"
                  placeholder="Confirm Password"
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
