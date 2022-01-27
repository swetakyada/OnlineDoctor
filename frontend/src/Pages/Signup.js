import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Sign.css";
import axios from "axios";
import { useHistory } from "react-router";

const SignUp = () => {
  const history = useHistory();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const [picLoading, setPicLoading] = useState(false);

  const submitHandler = async () => {
    setPicLoading(true);
    if (!name || !email || !password) {
      setPicLoading(false);
      alert("Please Fill all the Feilds");
      return;
    }
    console.log(name, email, password, pic);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email,
          password,
          pic,
        },
        config
      );
      console.log(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setPicLoading(false);
      alert("Registration Successful");
      history.push("/sign-in");
      return;
    } catch (error) {
      alert("Error Occured!");
      setPicLoading(false);
    }
  };

  const postDetails = (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      alert("Please Select an Image!");
      return;
    }
    console.log(pics);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "piyushproj");
      fetch("https://api.cloudinary.com/v1_1/ddgmoh1uz/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      alert("Please Select an Image!");
      setPicLoading(false);
      return;
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
          <form method="post" className="formFields">
            <div className="formField">
              <label className="formFieldLabel" htmlFor="name">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="formFieldInput"
                placeholder="Enter your full name"
                name="name"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
                required
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
                required
              />
            </div>
            <div className="formField">
              <label className="formFieldLabel" htmlFor="picture">
                Upload your Picture
              </label>
              <input
                type="file"
                className="formFieldInput"
                p={1.2}
                accept="image/*"
                onChange={(e) => postDetails(e.target.files[0])}
              />
            </div>

            <div className="formField">
              <button
                className="formFieldButton"
                onClick={submitHandler}
                isLoading={picLoading}
              >
                Sign Up
              </button>{" "}
              <Link to="/sign-in" className="formFieldLink">
                I'm already member
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
