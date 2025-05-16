// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './Components/AdminDashboard/AdminDashboard'; // Adjust path as needed
// App.js
import AppointmentsTable from './Components/AppointmentsTable';


function App() {
  return (
    <Router>
      <Routes>
        {/* Main Admin Dashboard */}
        <Route path="/AdminDashboard" element={<AdminDashboard />} />

        {/* Optional: Appointment Details Page */}
       

        {/* Redirect root to admin dashboard (optional) */}
        <Route path="/AppointmentsTable" element={<AppointmentsTable />} />
      </Routes>
    </Router>
  );
}

export default App;