import React, { useState } from "react";
import './SigninUp.css';
import { Row, Col } from "react-bootstrap";
const Signin = () => {
  // const history = useHistory()

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
      const response = await fetch("http://localhost:5000/doctor/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (data.status === "ok") {
        localStorage.setItem("token", data.user);
        alert("User Logged in successfully!!");
        window.location = "/dashboard";
      } else {
        alert(data.error);
      }
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
              <div> <h3>SignIn</h3>
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
              <div className="d-flex justify-content-center">  <button className="submit " type="submit">
                Sign In
              </button></div>

              <div className="d-flex justify-content-center">
                Don't have an account? <a href="/">SignUp</a>
              </div>

            </form>
          </div>
        </Col>
        <Col className="bg">
          <div>

          </div>
        </Col>
      </Row>
    </div >
  );
};

export default Signin;
