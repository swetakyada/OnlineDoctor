import React, { useState } from "react";
import "./Signup.css";
import { Row, Col } from "react-bootstrap";
import axios from "axios";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    try {
      if (!(email && password)) {
        alert("Invalid input");
        return;
      }
      console.log(email, " ", password);
      // const response = await fetch("http://localhost:5000/user/login", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     email,
      //     password,
      //   }),
      // });

      axios
        .post(
          "http://localhost:5000/user/login",
          {
            email: email,
            password: password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.data.status === "ok") {
            localStorage.setItem(
              "user",
              JSON.stringify({
                id: response.data.id,
                name: response.data.name,
                email: response.data.email,
              })
            );
            // alert("User Logged in successfully!!");
            window.location = "/dashboard";
          } else {
            // alert(response.data.error);
          }
        });

      // const data = await response.json();

      // if (data.status === 200) {
      //   localStorage.setItem("id", data.id);
      //   localStorage.setItem("name", data.name);
      //   localStorage.setItem("email", data.email);
      //   alert("User Logged in successfully!!");
      //   window.location = "/dashboard";
      // } else {
      //   alert(data.error);
      // }
    } catch (error) {
      console.log(error);
      alert("Error occured!!");
    }
  };

  return (
    <div>
      <Row>
        <Col className="account1">
          <div>
            <form className="account-form" onSubmit={() => handleSubmit()}>
              <div>
                {" "}
                <h3>SignIn</h3>
              </div>

              <div>
                Email
                <input
                  type="text"
                  placeholder="Enter your email address"
                  className="input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                Password
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className=" d-flex justify-content-center">
                <button className="submit" type="submit">
                  Sign In
                </button>
              </div>
              <p className=" d-flex justify-content-center">
                Don't have an account? <a href="/">Sign Up</a>
              </p>
            </form>
          </div>
        </Col>
        <Col className="bg">
          <div></div>
        </Col>
      </Row>
    </div>
  );
};

export default Signin;
