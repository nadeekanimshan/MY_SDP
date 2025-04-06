import React from 'react';
import { FaRocket, FaLightbulb, FaUsers } from 'react-icons/fa';

const About = () => {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="row align-items-center">
          {/* Image Column */}
          <div className="col-lg-6 mb-4 mb-lg-0">
            <img 
              src="https://via.placeholder.com/600x400" 
              alt="Our Team" 
              className="img-fluid rounded shadow"
            />
          </div>
          
          {/* Content Column */}
          <div className="col-lg-6">
            <h2 className="display-5 fw-bold mb-4">About Our Company</h2>
            <p className="lead mb-4">
              We're a team of passionate professionals dedicated to delivering exceptional results through innovation and expertise.
            </p>
            
            {/* Key Points */}
            <div className="mb-4">
              <div className="d-flex align-items-center mb-3">
                <div className="bg-primary bg-opacity-10 p-2 rounded me-3">
                  <FaRocket className="text-primary" />
                </div>
                <div>
                  <h5 className="mb-0">Innovative Solutions</h5>
                  <small className="text-muted">Cutting-edge technology for modern problems</small>
                </div>
              </div>
              
              <div className="d-flex align-items-center mb-3">
                <div className="bg-primary bg-opacity-10 p-2 rounded me-3">
                  <FaUsers className="text-primary" />
                </div>
                <div>
                  <h5 className="mb-0">Experienced Team</h5>
                  <small className="text-muted">Industry experts with years of experience</small>
                </div>
              </div>
              
              <div className="d-flex align-items-center">
                <div className="bg-primary bg-opacity-10 p-2 rounded me-3">
                  <FaLightbulb className="text-primary" />
                </div>
                <div>
                  <h5 className="mb-0">Creative Approach</h5>
                  <small className="text-muted">Unique solutions tailored to your needs</small>
                </div>
              </div>
            </div>
            
            <button className="btn btn-primary px-4">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;