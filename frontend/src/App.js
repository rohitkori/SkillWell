import logo from './logo.svg';
import './App.css';
import Homepage from "./Homepage.js";
import Login from "./pages/Login.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar.js";
import Jobs from './Jobs/Jobs';
import JobsDetail from './Jobs/JobsDetail';
import Error from "./404";
import Dashboard from "./Dashboard";
import Signup from './pages/Signup';
function App() {
  return (
    <>
      <Router>
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobsDetail" element={<JobsDetail />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/*" element={<Error />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
