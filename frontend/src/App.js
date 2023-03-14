import logo from './logo.svg';
import './App.css';
import Homepage from "./Homepage.js";
import Login from "./pages/Login.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar.js";
import Jobs from './Jobs/Jobs';
import JobsDetail from './Jobs/JobsDetail';
import Error from "./404";
function App() {
  return (
    <>
      <Router>
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobsDetail" element={<JobsDetail />} />
            <Route path="/*" element={<Error />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
