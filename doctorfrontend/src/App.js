import "./App.css";
import Signup from "./Components/Auth/Signup";
import Signin from "./Components/Auth/Signin";
import Dashboard from "./Components/Dashboard/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./Components/Dashboard/Profile";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Signup />} />
          <Route path="/login" element={<Signin />} />
          <Route
            path="/dashboard"
            element={localStorage.getItem("did") ? <Dashboard /> : <Signin />}
          />
          <Route
            path="/profile"
            element={localStorage.getItem("did") ? <Profile /> : <Signin />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
