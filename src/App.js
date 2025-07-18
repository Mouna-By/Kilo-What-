
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Profile from "./Pages/Profile/Profile";
import Consumption from "./Pages/Consumption/Consumption";
import Footer from "./Components/Footer/Footer";
import Home from "./Pages/Home/Home";
import AdminPanel from "./Pages/AdminPanel/AdminPanel";
import NotAuthorized from "./Pages/NotAuthorized/NotAuthorized";




function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/consumption" element={<Consumption />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
        <Route path="/not-authorized" element={<NotAuthorized />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
