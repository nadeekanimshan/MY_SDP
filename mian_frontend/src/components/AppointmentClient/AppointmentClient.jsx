import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // ✅ Import this
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import './AppointmentClient.css';



const AppointmentClient = () => {
  const [appointments, setAppointments] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // ✅ Initialize navigator

  const handleDateSelect = (selectInfo) => {
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
      sendToAdmin(newEvent);
    }
  };

  const sendToAdmin = (event) => {
    setAppointments([...appointments, event]);
    setTimeout(() => {
      const isAccepted = Math.random() > 0.5;
      const updatedEvent = {
        ...event,
        title: `${event.title} (${isAccepted ? 'Accepted' : 'Rejected'})`,
        status: isAccepted ? 'Accepted' : 'Rejected',
      };
      setAppointments(prev =>
        prev.map(e => (e.id === updatedEvent.id ? updatedEvent : e))
      );
      setMessage(`Your appointment was ${updatedEvent.status}`);
    }, 3000);
  };

  // ✅ This is the click handler for navigating to the details page
  const handleAppointmentClick = (appointment) => {
    navigate('/appointment-details', { state: { appointment } });
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="profile-section">
          <div className="avatar" />
          <h3>Profile name</h3>
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
          <h2>Dashboard</h2>
          <p>Welcome to your dashboard</p>
        </div>

        <div className="appointment-section">
          <div className="left-panel">
            <h3>My Appointments</h3>
            {appointments.map((a) => (
              <div
                key={a.id}
                className="appointment-card"
                onClick={() => handleAppointmentClick(a)} // 
                style={{ cursor: 'pointer' }}
              >
                <strong>{a.title}</strong>
                <p>{new Date(a.start).toLocaleString()}</p>
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
