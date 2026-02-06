import React, { useState } from "react";
import API from "../services/api";

function EmployeeForm({ onSuccess }) {
  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: ""
  });
  const [message, setMessage] = useState({ text: "", type: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = e => {
    e.preventDefault();
    
    // Frontend validation
    if (!form.employee_id || !form.full_name || !form.email || !form.department) {
      setMessage({ text: "All fields are required", type: "error" });
      setTimeout(() => setMessage({ text: "", type: "" }), 5000);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setMessage({ text: "Please enter a valid email address", type: "error" });
      setTimeout(() => setMessage({ text: "", type: "" }), 5000);
      return;
    }

    setSubmitting(true);
    API.post("employees/", form)
      .then(() => {
        setMessage({ text: "Employee added successfully!", type: "success" });
        setTimeout(() => setMessage({ text: "", type: "" }), 5000);
        setForm({ employee_id: "", full_name: "", email: "", department: "" });
        setSubmitting(false);
        if (onSuccess) onSuccess();
      })
      .catch(err => {
        let errorMsg = "Failed to add employee. ";
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
        <h3>➕ Add New Employee</h3>
        <p className="card-subtitle">Fill in the details to add a new employee</p>
      </div>

      <div className="card-body">
        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={submit} className="form">
        <input name="employee_id" placeholder="Employee ID" value={form.employee_id} onChange={handleChange} required />
        <input name="full_name" placeholder="Full Name" value={form.full_name} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="department" placeholder="Department" value={form.department} onChange={handleChange} required />
        <button className="btn-primary" disabled={submitting}>
          {submitting ? "Adding..." : "Add Employee"}
        </button>
      </form>
      </div>
    </div>
  );
}

export default EmployeeForm;
