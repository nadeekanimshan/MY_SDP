import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import './StudentDashboard.css'; // Add your CSS file for styling

const StudentDashboard = () => {
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleDateSelect = (selectInfo) => {
    const title = prompt('Enter event title:');
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();

    if (title) {
      const newEvent = {
        id: String(Date.now()),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
      };
      setEvents([...events, newEvent]);
      setMessage('Event added successfully!');
    }
  };

  const handleEventClick = (eventInfo) => {
    if (window.confirm(`Do you want to delete the event '${eventInfo.event.title}'?`)) {
      eventInfo.event.remove();
      setMessage('Event deleted successfully!');
    }
  };

  return (
    <div className="student-dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Student Dashboard</h2>
        <nav>
          <ul>
            <li>
              <Link to="/student/dashboard">Dashboard Home</Link>
            </li>
            <li>
              <Link to="/student/courses">My Courses</Link>
            </li>
            <li>
              <Link to="/student/assignments">Assignments</Link>
            </li>
            <li>
              <Link to="/student/profile">My Profile</Link>
            </li>
            <li>
              <Link to="/student/settings">Settings</Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="header">
          <h2>Student Dashboard</h2>
          <p>Welcome to your dashboard</p>
        </div>

        <div className="calendar-section">
          <h3>My Calendar</h3>
          {message && <div className="status-msg">{message}</div>}
          <FullCalendar
            plugins={[timeGridPlugin, interactionPlugin, dayGridPlugin]}
            initialView="timeGridWeek"
            selectable={true}
            editable={true}
            events={events}
            select={handleDateSelect}
            eventClick={handleEventClick}
            height="auto"
          />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;