import React, { useState } from "react";
import "./SigninUp.css";
import { Row, Col } from "react-bootstrap";
import axios from "axios";

const DoctorSignin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    // event.preventDefault();
    try {
      if (!(email && password)) {
        alert("Invalid input");
        return;
      }
      console.log(email, " ", password);

      axios
        .post(
          "http://localhost:5000/doctor/login",
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
          console.log(response.data);
          // alert("wait");
          if (response.data.status === "ok") {
            localStorage.setItem("did", response.data.id);
            localStorage.setItem("dname", response.data.name);
            localStorage.setItem("demail", response.data.email);
            // alert("User Logged in successfully!!");
            window.location = "/doctor/dashboard";
          } else {
            console.log("error");
            alert(response.data.error);
          }
        })
        .catch((error) => alert("Error!!"));

      // const response = await fetch("http://localhost:5000/doctor/login", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     email,
      //     password,
      //   }),
      // });
      // alert("Wait");
      // console.log(response);
      // alert("Wait");
      // const data = await response.json();
      // console.log(data);
      // alert("Wait");
      // if (data.status === "ok") {
      //   localStorage.setItem("did", data.id);
      //   localStorage.setItem("dname", data.name);
      //   localStorage.setItem("demail", data.email);
      //   alert("User Logged in successfully!!");
      //   window.location = "/doctor/dashboard";
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
                  placeholder="Email"
                  className="input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                Password
                <input
                  type="password"
                  placeholder="Password"
                  className="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="d-flex justify-content-center">
                {" "}
                <button className="submit " type="submit">
                  Sign In
                </button>
              </div>

              <div className="d-flex justify-content-center">
                Don't have an account? <a href="/doctor">SignUp</a>
              </div>
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

export default DoctorSignin;
