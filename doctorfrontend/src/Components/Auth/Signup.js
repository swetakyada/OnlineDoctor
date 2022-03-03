import React, { useState } from "react";
import "./SigninUp.css";
import { Row, Col } from "react-bootstrap";
import axios from "axios";

const Signup = () => {
  // const history = useHistory()

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const handleSubmit = async (event) => {
    // event.preventDefault();
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

      axios
        .post(
          "http://localhost:5000/doctor/register",
          {
            name: name,
            email: email,
            speciality: speciality,
            description: description,
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
          alert("wait");
          if (response.data.status === "ok") {
            alert("User Registered Successfully!");
            window.location = "/login";
          } else {
            alert("Failed to Register the user.\n" + response.data.error);
          }
        });

      // const response = await fetch("http://localhost:5000/doctor/register", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     name,
      //     email,
      //     speciality,
      //     description,
      //     password,
      //   }),
      // });

      // const data = await response.json();

      // if (data.status === "ok") {
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
            <form className="account-form1" onSubmit={() => handleSubmit()}>
              <div>
                {" "}
                <h3>SignUP</h3>
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
                Speciality
                <input
                  type="text"
                  placeholder="Speciality"
                  className="input"
                  value={speciality}
                  onChange={(e) => setSpeciality(e.target.value)}
                />
              </div>
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
              <div className="d-flex justify-content-center">
                {" "}
                <button className="submit " type="submit">
                  Sign Up
                </button>
              </div>

              <div className="d-flex justify-content-center">
                Already have an account? <a href="/login">Sign In</a>
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

export default Signup;
