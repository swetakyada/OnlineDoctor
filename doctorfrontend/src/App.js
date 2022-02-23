import "./App.css";
import Signup from "./Components/Auth/Signup";
import Signin from "./Components/Auth/Signin";
import Dashboard from "./Components/Dashboard/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Signup />} />
          <Route path="/login" element={<Signin />} />
          <Route
            path="/home"
            element={localStorage.getItem("token") ? <Dashboard /> : <Signin />}
          />
          {/* <Route
            path="/profile"
            element={localStorage.getItem("token") ? <Profile /> : <Signin />}
          /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
