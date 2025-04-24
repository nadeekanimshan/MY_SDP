import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Gallery.css'; // Custom styles

import React, { useCallback, useEffect, useRef, useState } from 'react';

import Container from 'react-bootstrap/Container';
import Slider from 'react-slick';
import { assest } from '../../assest/assest';

function Gallery() {
      const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
      const [isTablet, setIsTablet] = useState(window.innerWidth > 600 && window.innerWidth <= 1100);
      const sliderRef = useRef(null);

      const handleResize = useCallback(() => {
        setIsMobile(window.innerWidth <= 600);
        setIsTablet(window.innerWidth > 600 && window.innerWidth <= 1100);
      }, []);

      useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, [handleResize]);

      const cardsData = [
        { image: assest.H1 },
        { image: assest.H2 },
        { image: assest.H3 },
        { image: assest.H4 },
        { image: assest.H5 },
        
      
      ];

      const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
          {
            breakpoint: 1100,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      };

      return (
        <div className="gallery-section" id='gallery' style={{ position: 'relative', padding: '20px', color: '#fff' }}>
          <div
            className="background-image"
            style={{
              backgroundImage: `url(${assest.bg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 0, // Ensure it's behind the content
            }}
          />
          <div
            className="dark-overlay"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay
              zIndex: 1, // Ensure it's above the background image
            }}
          />
          <Container style={{ position: 'relative', zIndex: 2 }}>
            <h2 className="gallery-heading">
            Our Memories
            </h2>
            <Slider ref={sliderRef} {...settings}>
              {cardsData.map((card, idx) => (
                <div key={idx} className="slide">
                  <img
                    src={card.image}
                    alt={`Gallery Image ${idx + 1}`}
                    style={{
                      width: '100%',
                      borderRadius: '15px',
                      objectFit: 'cover',
                    }}
                  />
                </div>
              ))}
            </Slider>
          </Container>
        </div>
      );
    }

    export default Gallery;
