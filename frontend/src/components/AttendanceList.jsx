import React, { useEffect, useState } from "react";
import API from "../services/api";

function AttendanceList() {
  const [records, setRecords] = useState([]);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(true);
  const [filterDate, setFilterDate] = useState("");

  const fetchAttendance = () => {
    setLoading(true);
    const url = filterDate ? `attendance/?date=${filterDate}` : "attendance/";
    API.get(url)
      .then(res => {
        setRecords(res.data);
        setLoading(false);
      })
      .catch(err => {
        setMessage({ text: "Failed to load attendance records: " + (err.response?.data?.detail || err.message), type: "error" });
        setTimeout(() => setMessage({ text: "", type: "" }), 5000);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAttendance();
  }, [filterDate]);

  return (
    <div className="card">
      <div className="card-header">
        <h3>📊 Attendance Records</h3>
        <p className="card-subtitle">{records.length} record(s) found</p>
      </div>

      <div className="card-body">
        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <div className="filter-section">
          <input 
            type="date" 
            value={filterDate} 
            onChange={(e) => setFilterDate(e.target.value)}
            placeholder="Filter by date"
            className="filter-input"
          />
          {filterDate && (
            <button onClick={() => setFilterDate("")} className="btn-secondary">
              Clear Filter
            </button>
          )}
        </div>

        {loading ? (
        <p className="loading">Loading attendance records...</p>
      ) : records.length === 0 ? (
        <div className="empty-state">
          <p>No attendance records found</p>
          <small>{filterDate ? "Try clearing the filter or selecting a different date" : "Mark attendance using the form above to see records here"}</small>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {records.map(rec => (
              <tr key={rec.id}>
                <td>{rec.employee_name}</td>
                <td>{rec.date}</td>
                <td>
                  <span className={`status-badge ${rec.status.toLowerCase()}`}>
                    {rec.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      </div>
    </div>
  );
}

export default AttendanceList;
