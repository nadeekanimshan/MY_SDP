import "./Footer.css";

import React from "react";
import { assest } from "../../assest/assest";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assest.expo} alt="FMS Education Logo" className="footer-logo" />
          <p>
          Your premier destination for artistic growth, professional guidance, and creative innovation—delivering every session with passion, precision, and purpose.          </p>
          <div className="footer-social-icons">
            <a href="https://web.facebook.com/audiodiarystudios" target="_blank" rel="noopener noreferrer">
              <img src={assest.facebook_icon} alt="Facebook" />
            </a>
            <a href="https://www.instagram.com/audio_diary_studios/" target="_blank" rel="noopener noreferrer">
              <img src={assest.twitter_icon} alt="Twitter" />
            </a>
          </div>
        </div>
        <div className="footer-content-center">
          <h2>Links</h2>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#my-5">Services</a></li>
            <li><a href="#container">About</a></li>
           
            <li><a href="#footer">Contact</a></li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>Get in Touch</h2>
          <ul>
            <li>Audio Diary Studio,</li>
            <li>Boralasgamuwa,</li>
            <li>Sri Lanka.</li>
            <div className="contact">
              <a href="tel:+94717577400" className="contact1">
                <img src={assest.phone} alt="Phone" />
                +9477 028 4814  <br /> +9477 789 5363
              </a>
            </div>
            <div className="contact">
              <a href="mailto:audiodiaryrecords@gmail.com" className="contact">
                <img src={assest.email} alt="Email" />
                audiodiaryrecords@gmail.com
              </a>
            </div>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">© 2025 AudioDiary™. All Rights Reserved.</p>
    </div>
  );
};

export default Footer;
