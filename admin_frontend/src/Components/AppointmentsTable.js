// src/components/AppointmentsTable.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AppointmentsTable.css';

const AppointmentsTable = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/appointments?client_id=2')
      .then((res) => setAppointments(res.data))
      .catch((err) => console.error('Error fetching data:', err));
  }, []);

  return ( 
    <div className="appointments-container">
      <h1 className="appointments-title">My Appointments</h1>
      <div className="appointments-table-wrapper">
        <table className="appointments-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Status</th>
              <th>Client ID</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt.id}>
                <td>{appt.id}</td>
                <td>{appt.title}</td>
                <td>{new Date(appt.start_time).toLocaleString()}</td>
                <td>{new Date(appt.end_time).toLocaleString()}</td>
                <td className="status">{appt.status}</td>
                <td>{appt.Client_ID}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentsTable;
