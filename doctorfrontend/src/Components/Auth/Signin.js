import React, { useState } from "react";

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
      <div className="account">
        <form className="account-form" onSubmit={() => handleSubmit()}>
          <div>
            <input
              type="text"
              placeholder="Email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="submit" type="submit">
            Sign In
          </button>
        </form>
        <p>
          Don't have an account? <a href="/">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Signin;
