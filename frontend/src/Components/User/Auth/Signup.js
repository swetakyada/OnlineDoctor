import React, { useState } from "react";
//import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import "./Signup.css";

const Signup = () => {
  // const history = useHistory()

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const handleSubmit = async (event) => {
    // event.preventDefault();

    try {
      if (!(name && email && password && cpassword && password === cpassword)) {
        alert("Invalid input");
        return;
      }
      // console.log(name, " ", email, " ", password);
      // const response = await fetch("http://localhost:5000/user/register", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     name,
      //     email,
      //     password,
      //   }),
      // });
      axios
        .post(
          "http://localhost:5000/user/register",
          {
            name: name,
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
            // alert("User Registered Successfully!");
            window.location = "/login";
          } else {
            // alert("Failed to Register the user.\n" + response.data.error);
          }
        });

      // const data = await response.json();
      // console.log(data);
      // if (data.status === 200) {
      //   alert("User registered successfully!!");
      //   window.location = "/login";
      // } else {
      //   alert("Falied to create the user");
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
                <h3>SignUP</h3>
                <h6>Create account and book your appointment</h6>
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
                Password
                <input
                  type="password"
                  placeholder="Password"
                  className="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                Confirm Password
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
                  Sign Up
                </button>
              </div>

              <p className=" d-flex justify-content-center">
                Already have an account? <a href="/login">Sign In</a>
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

export default Signup;
