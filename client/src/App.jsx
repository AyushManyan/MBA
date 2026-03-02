import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Navbar from "./components/Navbar";
import RoleSelect from "./pages/RoleSelect";
import StudentLayout from "./layouts/StudentLayout";
import OrganizerLayout from "./layouts/OrganizerLayout";
import StudentDashboard from "./pages/student/Dashboard";
import OrganizerDashboard from "./pages/organizer/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";
import Login from "./pages/Login";

import UpdateEvent from "./pages/organizer/UpdateEvent";
import Features from "./pages/Features";
import HowItWorks from "./pages/HowItWorks";
import About from "./pages/About";

const App = () => (
  <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/role" element={<ProtectedRoute><RoleSelect /></ProtectedRoute>} />
      <Route path="/features" element={<Features />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/about" element={<About />} />
      <Route
        path="/student"
        element={<ProtectedRoute role="student"><StudentLayout /></ProtectedRoute>}
      >
        <Route path="dashboard" element={<StudentDashboard />} />
      </Route>
      <Route
        path="/organizer"
        element={<ProtectedRoute role="organizer"><OrganizerLayout /></ProtectedRoute>}
      >
        <Route path="dashboard" element={<OrganizerDashboard />} />
        <Route path="update-event/:eventId" element={<UpdateEvent />} />
      </Route>
    </Routes>
  </>
);

export default App;