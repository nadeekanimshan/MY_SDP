// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './Components/AdminDashboard/AdminDashboard'; // Adjust path as needed


function App() {
  return (
    <Router>
      <Routes>
        {/* Main Admin Dashboard */}
        <Route path="/AdminDashboard" element={<AdminDashboard />} />

        {/* Optional: Appointment Details Page */}
       

        {/* Redirect root to admin dashboard (optional) */}
        
      </Routes>
    </Router>
  );
}

export default App;