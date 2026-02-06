import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import AttendanceForm from "./components/AttendanceForm";
import AttendanceList from "./components/AttendanceList";
import "./App.css";

function App() {
  const [activeView, setActiveView] = useState("dashboard");
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="app-container">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      
      <div className="main-content">
        <div className="content-header">
          <h1 className="page-title">
            {activeView === "dashboard" && "📊 Dashboard"}
            {activeView === "employees" && "👥 Employee Management"}
            {activeView === "attendance" && "📅 Attendance Management"}
          </h1>
          <div className="header-actions">
            <button className="btn-refresh" onClick={handleRefresh}>
              🔄 Refresh
            </button>
          </div>
        </div>

        <div className="content-body">
          {activeView === "dashboard" && (
            <Dashboard key={refreshKey} />
          )}

          {activeView === "employees" && (
            <div className="view-container">
              <div className="section-card">
                <EmployeeForm onSuccess={handleRefresh} />
              </div>
              <div className="section-card">
                <EmployeeList key={refreshKey} />
              </div>
            </div>
          )}

          {activeView === "attendance" && (
            <div className="view-container">
              <div className="section-card">
                <AttendanceForm onSuccess={handleRefresh} />
              </div>
              <div className="section-card">
                <AttendanceList key={refreshKey} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
