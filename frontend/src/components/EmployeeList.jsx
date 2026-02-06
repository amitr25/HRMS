import React, { useEffect, useState, useCallback } from "react";
import API from "../services/api";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(true);

  const fetchEmployees = useCallback(() => {
    setLoading(true);
    API.get("employees/")
      .then(res => {
        // Fetch present days for each employee
        const employeesWithDays = res.data.map(emp => {
          return API.get(`employees/${emp.id}/present_days/`)
            .then(dayRes => ({ ...emp, present_days: dayRes.data.total_present_days }))
            .catch(() => ({ ...emp, present_days: 0 }));
        });
        
        Promise.all(employeesWithDays)
          .then(employees => {
            setEmployees(employees);
            setLoading(false);
          });
      })
      .catch(err => {
        setMessage({ text: "Failed to load employees: " + (err.response?.data?.detail || err.message), type: "error" });
        setTimeout(() => setMessage({ text: "", type: "" }), 5000);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const handleDelete = (id, name) => {
    if (!window.confirm(`Are you sure you want to delete ${name}?`)) {
      return;
    }

    API.delete(`employees/${id}/`)
      .then(() => {
        setMessage({ text: `Employee ${name} deleted successfully`, type: "success" });
        setTimeout(() => setMessage({ text: "", type: "" }), 5000);
        fetchEmployees();
      })
      .catch(err => {
        setMessage({ text: "Failed to delete employee: " + (err.response?.data?.detail || err.message), type: "error" });
        setTimeout(() => setMessage({ text: "", type: "" }), 5000);
      });
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3>📋 Employee List</h3>
        <p className="card-subtitle">{employees.length} employee(s) registered</p>
      </div>

      <div className="card-body">
        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        {loading ? (
        <p className="loading">Loading employees...</p>
      ) : employees.length === 0 ? (
        <div className="empty-state">
          <p>No employees found</p>
          <small>Add your first employee using the form above</small>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Present Days</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr key={emp.id}>
                <td>{emp.employee_id}</td>
                <td>{emp.full_name}</td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>
                <td>
                  <span className="badge-present">{emp.present_days || 0}</span>
                </td>
                <td>
                  <button 
                    onClick={() => handleDelete(emp.id, emp.full_name)} 
                    className="btn-delete"
                  >
                    Delete
                  </button>
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

export default EmployeeList;
