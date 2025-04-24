import "bootstrap/dist/css/bootstrap.min.css";
import "./FeaturedPosts.css";
import { Link, useNavigate } from "react-router-dom";
import React from "react";

const FeaturedPosts = () => {
  const navigate = useNavigate();

  // Hardcoded services data
  const services = [
    {
      id: 1,
      title: "Recording Appointment",
      description: "Book a professional recording session in our state-of-the-art studio with experienced sound engineers.",
      category: "Recording",
      imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      author: "Studio Team",
      date: "Available Daily"
    },
    {
      id: 2,
      title: "Vocal Training Class",
      description: "Improve your singing with our expert vocal coaches through personalized training sessions.",
      category: "Training",
      imageUrl: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      author: "Vocal Coaches",
      date: "Weekly Sessions"
    }
  ];

  const handleServiceClick = (serviceId) => {
    navigate('/signup', { state: { serviceId } });
  };

  return (
    <div className="container my-5">
      <div className="text-center mb-4">
        <h2 className="featured-title">Our Services</h2>
      </div>
      <div className="row justify-content-center">
        {services.map((service) => (
          <div key={service.id} className="col-lg-6 col-md-6 mb-4">
            <div 
              className="card post-card h-100 border-0 shadow-sm cursor-pointer"
              onClick={() => handleServiceClick(service.id)}
            >
              <div className="row g-0 h-100">
                {/* Image Column */}
                <div className="col-md-5">
                  <div 
                    className="h-100 post-image"
                    style={{ 
                      backgroundImage: `url(${service.imageUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    <span className="post-category badge" style={{ backgroundColor: "#ac834f", color: "white" }}>
                      {service.category}
                    </span>
                  </div>
                </div>
                
                {/* Content Column */}
                <div className="col-md-7">
                  <div className="card-body d-flex flex-column h-100">
                    <h5 className="card-title text-dark">
                      {service.title}
                    </h5>
                    <p className="card-text text-muted mb-3">{service.description}</p>
                    <div className="post-info text-muted mt-auto">
                      <span className="me-3"><i className="bi bi-person"></i> {service.author}</span>
                      <span><i className="bi bi-calendar"></i> {service.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-end mt-3">
        <Link to="/services" className="btn btn-outline-primary">
          View All Services <i className="bi bi-arrow-right"></i>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedPosts;