import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import './ClientDashboard.css';

const API_BASE_URL = 'http://localhost:5000/api'; // Adjust if deployed

const AppointmentClient = () => {
  const [appointments, setAppointments] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Fetch appointments on load
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/appointments`);
        if (!response.ok) {
          throw new Error('Failed to fetch appointments');
        }
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setMessage('Failed to load appointments.');
      }
    };

    fetchAppointments();
  }, []);

  const handleDateSelect = async (selectInfo) => {
    const title = prompt('Enter reason for appointment:');
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();

    if (title) {
      const newEvent = {
        id: String(Date.now()),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        status: 'Pending',
      };

      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/appointments`, {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              token  // Standard way to send JWT
            },
          body: JSON.stringify(newEvent),
        });

        if (response.ok) {
          setAppointments((prev) => [...prev, newEvent]);
        } else {
          setMessage('Failed to send appointment. Try again.');
        }
      } catch (error) {
        console.error('Error creating appointment:', error);
        setMessage('Server error. Please try later.');
      }
    }
  };

  const handleAppointmentClick = (appointment) => {
    navigate('/appointment-details', { state: { appointment } });
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="profile-section">
          <div className="avatar" />
          <h3>Profile Name</h3>
          <p>Client</p>
        </div>
        <nav className="sidebar-nav">
          <p className="active">Dashboard</p>
          <Link to="/AppointmentDetails">Appointments</Link>
          <p>Logout</p>
        </nav>
      </div>

      <div className="main-content">
        <div className="header">
          <h2>Client Dashboard</h2>
          <p>Welcome to your dashboard</p>
        </div>

        <div className="appointment-section">
          <div className="left-panel">
            <h3>My Appointments</h3>
            {appointments.map((a) => (
              <div
                key={a.id}
                className="appointment-card"
                onClick={() => handleAppointmentClick(a)}
                style={{ cursor: 'pointer' }}
              >
                <strong>{a.title}</strong>
                <p>{new Date(a.start).toLocaleString()}</p>
                <p>Status: {a.status}</p>
              </div>
            ))}
          </div>

          <div className="calendar-panel">
            <div className="calendar-header">
              <button className="tab active">My Appointments</button>
            </div>
            {message && <div className="status-msg">{message}</div>}
            <FullCalendar
              plugins={[timeGridPlugin, interactionPlugin, dayGridPlugin]}
              initialView="timeGridWeek"
              selectable={true}
              editable={false}
              events={appointments}
              select={handleDateSelect}
              height="auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentClient;