import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AppointmentClient.css';

const AppointmentClient = () => {
  const [appointments, setAppointments] = useState([]);
  const [message, setMessage] = useState('');
  const [newAppointment, setNewAppointment] = useState({
    title: '',
    date: '',
    time: ''
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newAppointment.title || !newAppointment.date || !newAppointment.time) {
      setMessage('Please fill all fields');
      return;
    }

    const appointment = {
      id: String(Date.now()),
      title: newAppointment.title,
      start: `${newAppointment.date}T${newAppointment.time}`,
      status: 'Pending'
    };

    sendToAdmin(appointment);
    setNewAppointment({ title: '', date: '', time: '' });
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
          <h2>My Appointments</h2>
          <p>Welcome to your Appointments</p>
        </div>

        <div className="appointment-section">
          <div className="left-panel">
            <h3>My Appointments</h3>
            
            {/* New Appointment Form */}
            <div className="appointment-form">
              <h4>Appointment number</h4>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Reason:</label>
                  <input
                    type="text"
                    name="title"
                    value={newAppointment.title}
                    onChange={handleInputChange}
                    placeholder="Enter reason for appointment"
                  />
                </div>
                <div className="form-group">
                  <label>Date:</label>
                  <input
                    type="date"
                    name="date"
                    value={newAppointment.date}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Time:</label>
                  <input
                    type="time"
                    name="time"
                    value={newAppointment.time}
                    onChange={handleInputChange}
                  />
                </div>
                <button type="submit">Schedule Appointment</button>
              </form>
            </div>

            {message && <div className="status-msg">{message}</div>}
            
            {/* Appointments List */}
            <div className="appointments-list">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentClient;