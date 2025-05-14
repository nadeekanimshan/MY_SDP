// AdminDashboard.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import './AdminDashboard.css'; // Ensure this CSS file exists

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Handle date selection (new appointment)
  const handleDateSelect = (selectInfo) => {
    const title = prompt('Enter appointment reason:');
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
      setAppointments([...appointments, newEvent]);
      simulateAdminResponse(newEvent); // Mock backend response
    }
  };

  // Simulate admin accepting/rejecting appointments
  const simulateAdminResponse = (event) => {
    setTimeout(() => {
      const isAccepted = Math.random() > 0.5;
      const updatedEvent = {
        ...event,
        title: `${event.title} (${isAccepted ? 'Approved' : 'Rejected'})`,
        status: isAccepted ? 'Approved' : 'Rejected',
      };
      setAppointments(prev =>
        prev.map(e => (e.id === updatedEvent.id ? updatedEvent : e))
      );
      setMessage(`Appointment ${updatedEvent.status}`);
    }, 2000);
  };

  // Navigate to appointment details
  const handleAppointmentClick = (appointment) => {
    navigate('/appointment-details', { state: { appointment } });
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="profile-section">
          <div className="avatar" />
          <h3>Admin Name</h3>
          <p>Admin</p>
        </div>
        <nav className="sidebar-nav">
          <p className="active">Dashboard</p>
          <Link to="/appointments">Appointments</Link>
          <p>Logout</p>
        </nav>
      </div>

      <div className="main-content">
        <div className="header">
          <h2>Admin Dashboard</h2>
          <p>Manage appointments and schedules</p>
        </div>

        <div className="appointment-section">
          <div className="left-panel">
            <h3>Appointments</h3>
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="appointment-card"
                onClick={() => handleAppointmentClick(appointment)}
              >
                <strong>{appointment.title}</strong>
                <p>{new Date(appointment.start).toLocaleString()}</p>
                <span className={`status-${appointment.status.toLowerCase()}`}>
                  {appointment.status}
                </span>
              </div>
            ))}
          </div>

          <div className="calendar-panel">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="timeGridWeek"
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay',
              }}
              selectable={true}
              editable={true}
              events={appointments}
              select={handleDateSelect}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;