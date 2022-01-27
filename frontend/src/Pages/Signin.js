import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Sign.css";
import { useHistory } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      alert("Please Fill all the Feilds");
      setLoading(false);
    } else {
      console.log(email, password);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };

        const { data } = await axios.post(
          "/api/user/sign-in",
          { email, password },
          config
        );

        // console.log(JSON.stringify(data));
        alert("Login Successful");
        localStorage.setItem("userInfo", JSON.stringify(data));
        setLoading(false);
        history.push("/home");
      } catch (error) {
        alert("Error Occured!");
        setLoading(false);
      }
    }
  };

  return (
    <div className="App">
      <div className="appAside"></div>
      <div className="appForm">
        <div className="pageSwitcher">
          <NavLink
            to="/sign-in"
            activeClassName="pageSwitcherItem-active"
            className="pageSwitcherItem"
          >
            Sign In
          </NavLink>
          <NavLink
            exact
            to="/sign-up"
            activeClassName="pageSwitcherItem-active"
            className="pageSwitcherItem"
          >
            Sign Up
          </NavLink>
        </div>

        <div className="formTitle">
          <NavLink
            to="/sign-in"
            activeClassName="formTitleLink-active"
            className="formTitleLink"
          >
            Sign In
          </NavLink>{" "}
          or{" "}
          <NavLink
            exact
            to="/sign-up"
            activeClassName="formTitleLink-active"
            className="formTitleLink"
          >
            Sign Up
          </NavLink>
        </div>
        <div className="formCenter">
          <form className="formFields" method="post">
            <div className="formField">
              <label className="formFieldLabel" htmlFor="email">
                E-Mail Address
              </label>
              <input
                type="email"
                id="email"
                className="formFieldInput"
                placeholder="Enter your email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="formField">
              <label className="formFieldLabel" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="formFieldInput"
                placeholder="Enter your password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="formField">
              <button
                className="formFieldButton"
                onClick={submitHandler}
                isLoading={loading}
              >
                Sign In
              </button>{" "}
              <Link to="/sign-up" className="formFieldLink">
                Create an account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
