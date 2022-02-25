import React, { useState } from "react";

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
      const response = await fetch("http://localhost:5000/doctor/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          speciality,
          description,
          password,
        }),
      });

      const data = await response.json();

      if (data.status === "ok") {
        alert("User registered successfully!!");
        window.location = "/login";
      } else {
        alert("Falied to create the user");
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
              placeholder="Username"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
              type="text"
              placeholder="Speciality"
              className="input"
              value={speciality}
              onChange={(e) => setSpeciality(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Description"
              className="input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              className="input"
              value={cpassword}
              onChange={(e) => setCpassword(e.target.value)}
            />
          </div>
          <button className="submit" type="submit">
            Sign Up
          </button>
        </form>
        <p>
          Already have an account? <a href="/login">Sign In</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
