import "./App.css";
import Signin from "./Components/Auth/Signin.js";
import Signup from "./Components/Auth/Signup.js";
import Dashboard from "./Components/Dashboard/Dashboard.js";
import Profile from "./Components/Dashboard/Profile.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Signup />} />
          <Route path="/login" element={<Signin />} />
          <Route
            path="/dashboard"
            element={localStorage.getItem("token") ? <Dashboard /> : <Signin />}
          />
          <Route
            path="/profile"
            element={localStorage.getItem("token") ? <Profile /> : <Signin />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
