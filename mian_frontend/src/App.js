import './App.css';

import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';



import CustomNavbar from './components/Navbar/Navbar';
import FeaturedPosts from './components/FeaturedPosts/FeaturedPosts';
import Footer from './components/Footer/Footer';
import Gallery from './components/Gallery/Gallery';
import Header from './components/Header/Header';

import ScrollToTopButton from './components/Contex/ScrollToTopButton';
import About from './components/About/About';
import AuthForm from './components/Signup/signup';
import FQ from './components/F&Q/F&Q';

import ClientDashboard from './components/ClientDashboard/ClientDashboard';
import StudentDashboard from './components/StudentDashboard/StudentDashboard';
function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top on route change
  }, [location]);

  return null;
}

function App() {
  const [articles, setArticles] = useState([
    { id: 1, title: 'Department Update 1', content: 'Content for article 1...', likes: 0, author: 'John Doe', authorImage: 'https://via.placeholder.com/100', imageUrl: 'https://via.placeholder.com/800x400' },
    { id: 2, title: 'New Policies Announced', content: 'Content for article 2...', likes: 0, author: 'Jane Smith', authorImage: 'https://via.placeholder.com/100', imageUrl: 'https://via.placeholder.com/800x400' },
    { id: 3, title: 'Upcoming Events', content: 'Content for article 3...', likes: 0, author: 'Mike Johnson', authorImage: 'https://via.placeholder.com/100', imageUrl: 'https://via.placeholder.com/800x400' },
  ]);

  return (
  
    <Router>
      <div className="app-container">
        <ScrollToTop/>
        <CustomNavbar />
        <Routes>
        <Route path="/" element={<Header />} />
        
        </Routes>
        <Routes>
        <Route path="/" element={<About/>} />
        
        </Routes>
        <Routes>
        <Route path="/" element={<FeaturedPosts />} />
        
        </Routes>
       
        <Routes>
        <Route path="/" element={<FQ />} />
        
        </Routes>
        <Routes>
        <Route path="/" element={<Gallery/>} />
        
        </Routes>
        <Routes>
        <Route path="/signup" element={<AuthForm/>} />
        
        </Routes>
        <Routes>
        <Route path="/client/dashboard" element={<ClientDashboard />} />
        </Routes>

        <Routes>
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        </Routes>
        
        {/* Main content with padding */}
        <div className="main-content">
          <Routes>
            
            
            
        
          </Routes>
        </div>
        
        {/* Footer */}
        <Footer />
        <ScrollToTopButton/>
      </div>
    </Router>

    
  );
}

export default App;
