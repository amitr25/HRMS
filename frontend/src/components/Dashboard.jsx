import React, { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    API.get("dashboard/")
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="dashboard-error">
        <p>Failed to load dashboard data</p>
      </div>
    );
  }

  const stats = [
    {
      id: 1,
      title: "Total Employees",
      value: data.total_employees,
      icon: "👥",
      color: "blue",
      description: "Active employees in the system"
    },
    {
      id: 2,
      title: "Attendance Records",
      value: data.total_attendance_records,
      icon: "📝",
      color: "purple",
      description: "Total attendance entries"
    },
    {
      id: 3,
      title: "Present Today",
      value: data.total_present_records,
      icon: "✅",
      color: "green",
      description: "Employees marked present"
    },
    {
      id: 4,
      title: "Attendance Rate",
      value: data.total_attendance_records > 0 
        ? `${Math.round((data.total_present_records / data.total_attendance_records) * 100)}%`
        : "0%",
      icon: "📊",
      color: "orange",
      description: "Overall attendance percentage"
    }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-stats">
        {stats.map(stat => (
          <div key={stat.id} className={`stat-card stat-${stat.color}`}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-details">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-title">{stat.title}</div>
              <div className="stat-description">{stat.description}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-overview">
        <div className="overview-card">
          <div className="card-header">
            <h3>📈 Quick Overview</h3>
          </div>
          <div className="card-content">
            <div className="overview-item">
              <span className="overview-label">System Status:</span>
              <span className="badge badge-success">Active</span>
            </div>
            <div className="overview-item">
              <span className="overview-label">Last Updated:</span>
              <span className="overview-value">{new Date().toLocaleString()}</span>
            </div>
            <div className="overview-item">
              <span className="overview-label">Database:</span>
              <span className="badge badge-info">Connected</span>
            </div>
          </div>
        </div>

        <div className="overview-card">
          <div className="card-header">
            <h3>ℹ️ Quick Actions</h3>
          </div>
          <div className="card-content">
            <p className="help-text">
              Use the navigation menu on the left to:
            </p>
            <ul className="action-list">
              <li>👥 Manage employee records</li>
              <li>📅 Track daily attendance</li>
              <li>📊 View analytics and reports</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
