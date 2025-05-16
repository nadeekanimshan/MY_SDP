import React from 'react';
import { FaRocket, FaLightbulb, FaUsers } from 'react-icons/fa';
import { assest } from '../../assest/assest';
import './About.css'; 

const About = () => {
  return (
    <section id='about' className="py-5 bg-light">
      <div className="container">
        {/* Centered Heading with Gold Underline */}
        <div className="row text-center mb-5">
          <div className="col-12">
            <h2 className="display-5 fw-bold position-relative d-inline-block">
              About Us
              <span className="position-absolute bottom-0 start-50 translate-middle-x bg-warning" 
                    style={{
                      width: '80px',
                      height: '3px',
                      backgroundColor: '#ac834f'
                    }}></span>
            </h2>
          </div>
        </div>

        <div className="row align-items-center">
          
          <div className="col-lg-6 mb-4 mb-lg-0">
            <img 
              src={assest.L1}
              alt="Our Team" 
              className="img-fluid rounded shadow"
            />
          </div>
          
          {/* Content Column */}
          <div className="col-lg-6">
            <p style={{textAlign:'justify'}} className="lead mb-4">
              At Audio Diary Studio, we're a team of passionate artists, producers, and educators committed to helping voices be heard—literally and figuratively. Whether you're here to sharpen your musical skills, record your next big hit, or share your story through sound, we bring innovation, heart, and expertise to every beat.
            </p>
            
            {/* Key Points */}
            <div className="mb-4">
              <div className="d-flex align-items-center mb-3">
                <div className="bg-primary bg-opacity-10 p-2 rounded me-3">
                  <FaRocket className="text-primary" />
                </div>
                <div>
                  <h5 className="mb-0">Innovative Soundscapes</h5>
                  <small className="text-muted">State-of-the-art tools to craft your perfect audio experience</small>
                </div>
              </div>
              
              <div className="d-flex align-items-center mb-3">
                <div className="bg-primary bg-opacity-10 p-2 rounded me-3">
                  <FaUsers className="text-primary" />
                </div>
                <div>
                  <h5 className="mb-0">Creative Expression</h5>
                  <small className="text-muted">Custom music and training solutions made just for you</small>
                </div>
              </div>
              
              <div className="d-flex align-items-center">
                <div className="bg-primary bg-opacity-10 p-2 rounded me-3">
                  <FaLightbulb className="text-primary" />
                </div>
                <div>
                  <h5 className="mb-0">Skilled Professionals</h5>
                  <small className="text-muted">A team of seasoned artists, producers, and trainers by your side</small>
                </div>
              </div>
            </div>
            
            <button className="btn btn-primary px-4">
              Studio Staff
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;