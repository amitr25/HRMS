import React from "react";

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">HRMS Lite</h2>
      <div className="nav-links">
        <span>Dashboard</span>
        <span>Employees</span>
        <span>Attendance</span>
      </div>
    </nav>
  );
}

export default Navbar;
