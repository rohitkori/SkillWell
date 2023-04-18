import logo from "./logo.svg";
import "./App.css";
import Homepage from "./Homepage.js";
import Login from "./pages/Login.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar.js";
import Jobs from "./Jobs/Jobs";
import JobsDetail from "./Jobs/JobsDetail";
import CreateJob from "./Jobs/CreateJob";
import Error from "./404";
import Dashboard from "./Dashboard";
import Signup from "./pages/Signup";
import EditProfile from "./pages/EditProfile";
import Applicant from "./Jobs/applicants";
import Profile from "./pages/Profile";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "react-hot-toast";
import EditSkills from "./pages/EditSkills";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <div className="app">
            <Navbar />
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/jobDetail" element={<JobsDetail />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/createJob" element={<CreateJob />} />
              <Route path="/editProfile" element={<EditProfile />} />
              <Route path="/applicants" element={<Applicant />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/edit-skills" element={<EditSkills />} />
              <Route path="/*" element={<Error />} />
            </Routes>
          </div>
          <Toaster />
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
