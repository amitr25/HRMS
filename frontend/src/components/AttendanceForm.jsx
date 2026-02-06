import React, { useEffect, useState } from "react";
import API from "../services/api";

function AttendanceForm({ onSuccess }) {
  const [employees, setEmployees] = useState([]);
  const [data, setData] = useState({
    employee: "",
    date: "",
    status: "Present"
  });
  const [message, setMessage] = useState({ text: "", type: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    API.get("employees/")
      .then(res => setEmployees(res.data))
      .catch(err => {
        setMessage({ text: "Failed to load employees: " + (err.response?.data?.detail || err.message), type: "error" });
        setTimeout(() => setMessage({ text: "", type: "" }), 5000);
      });
  }, []);

  const submit = e => {
    e.preventDefault();
    
    // Frontend validation
    if (!data.employee || !data.date) {
      setMessage({ text: "Please select employee and date", type: "error" });
      setTimeout(() => setMessage({ text: "", type: "" }), 5000);
      return;
    }

    setSubmitting(true);
    API.post("attendance/", data)
      .then(() => {
        setMessage({ text: "Attendance marked successfully!", type: "success" });
        setTimeout(() => setMessage({ text: "", type: "" }), 5000);
        setData({ employee: "", date: "", status: "Present" });
        setSubmitting(false);
        if (onSuccess) onSuccess();
      })
      .catch(err => {
        let errorMsg = "Failed to mark attendance. ";
        if (err.response?.data) {
          const errors = err.response.data;
          if (typeof errors === 'object') {
            errorMsg += Object.entries(errors)
              .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`)
              .join('; ');
          } else {
            errorMsg += errors;
          }
        } else {
          errorMsg += err.message;
        }
        setMessage({ text: errorMsg, type: "error" });
        setTimeout(() => setMessage({ text: "", type: "" }), 5000);
        setSubmitting(false);
      });
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3>✏️ Mark Attendance</h3>
        <p className="card-subtitle">Record employee attendance for the day</p>
      </div>

      <div className="card-body">
        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={submit} className="form">
        <select value={data.employee} onChange={e => setData({ ...data, employee: e.target.value })} required>
          <option value="">Select Employee</option>
          {employees.map(emp => (
            <option key={emp.id} value={emp.id}>{emp.full_name}</option>
          ))}
        </select>

        <input type="date" value={data.date} onChange={e => setData({ ...data, date: e.target.value })} required />

        <select value={data.status} onChange={e => setData({ ...data, status: e.target.value })} required>
          <option>Present</option>
          <option>Absent</option>
        </select>

        <button className="btn-primary" disabled={submitting}>
          {submitting ? "Submitting..." : "Mark Attendance"}
        </button>
      </form>
      </div>
    </div>
  );
}

export default AttendanceForm;
