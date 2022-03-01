import "./App.css";
import Signin from "./Components/Auth/Signin.js";
import Signup from "./Components/Auth/Signup.js";
import Dashboard from "./Components/Dashboard/Dashboard.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Appointment from "./Components/Dashboard/Appointment";
import Chat from "./Components/Dashboard/Chat";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Signup />} />
          <Route path="/login" element={<Signin />} />
          <Route
            path="/dashboard"
            element={localStorage.getItem("id") ? <Dashboard /> : <Signin />}
          />
          <Route
            path="/appointments"
            element={localStorage.getItem("id") ? <Appointment /> : <Signin />}
          />
          <Route
            path="/chats"
            element={localStorage.getItem("id") ? <Chat /> : <Signin />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
