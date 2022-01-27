// import { Route } from "react-router-dom";
import { HashRouter as Router, Route, NavLink } from "react-router-dom";
import React, { Component } from "react";
import "./App.css";
import Home from "./Pages/Home";
import ChatPage from "./Pages/ChatPage";
import SignIn from "./Pages/Signin";
import SignUp from "./Pages/Signup";

function App() {
  return (
    <div>
      <Route path="/sign-up" component={SignUp} />
      <Route path="/sign-in" component={SignIn} />
      <Route path="/home" component={Home} />
      <Route path="/chat" component={ChatPage} />
    </div>
  );
}

export default App;
