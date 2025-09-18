import React from "react";
import { Link } from "react-router-dom";

// Modern, minimal footer component
const Footer = () => {
  return (
    <footer style={{
      background: '#1a1a1a',
      color: '#ffffff',
      padding: '60px 0 20px 0',
      borderTop: '1px solid #333'
    }}>
      <div className="container">
        {/* Main Footer Content */}
        <div className="row" style={{ marginBottom: '40px' }}>
          {/* Logo and Description */}
          <div className="col-lg-4 col-md-6 mb-4">
            <div style={{ marginBottom: '20px' }}>
              <Link to="/">
                <img 
                  src="assets/images/logo-white.png" 
                  alt="InstaIQ Logo" 
                  style={{ height: '40px', marginBottom: '15px' }}
                />
              </Link>
            </div>
            <p style={{ 
              color: '#999', 
              fontSize: '14px', 
              lineHeight: '1.6',
              marginBottom: '20px'
            }}>
              Empowering students with industry-leading aptitude training and placement preparation. 
              Join thousands who have successfully cracked their dream jobs.
            </p>
            <div style={{ display: 'flex', gap: '15px' }}>
              <a href="mailto:support@instaiq.in" style={{ color: '#999', textDecoration: 'none' }}>
                <i className="fa fa-envelope" style={{ marginRight: '8px' }}></i>
                support@instaiq.in
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h6 style={{ 
              color: '#ffffff', 
              fontSize: '16px', 
              fontWeight: '600',
              marginBottom: '20px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Quick Links
            </h6>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '10px' }}>
                <Link to="/" style={{ color: '#999', textDecoration: 'none', fontSize: '14px', transition: 'color 0.3s' }}>
                  Home
                </Link>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <Link to="/about" style={{ color: '#999', textDecoration: 'none', fontSize: '14px', transition: 'color 0.3s' }}>
                  About Us
                </Link>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <Link to="/courses" style={{ color: '#999', textDecoration: 'none', fontSize: '14px', transition: 'color 0.3s' }}>
                  Courses
                </Link>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <Link to="/events" style={{ color: '#999', textDecoration: 'none', fontSize: '14px', transition: 'color 0.3s' }}>
                  Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h6 style={{ 
              color: '#ffffff', 
              fontSize: '16px', 
              fontWeight: '600',
              marginBottom: '20px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Support
            </h6>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '10px' }}>
                <Link to="/faq" style={{ color: '#999', textDecoration: 'none', fontSize: '14px', transition: 'color 0.3s' }}>
                  FAQ
                </Link>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <Link to="/contact" style={{ color: '#999', textDecoration: 'none', fontSize: '14px', transition: 'color 0.3s' }}>
                  Contact
                </Link>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <Link to="/blog" style={{ color: '#999', textDecoration: 'none', fontSize: '14px', transition: 'color 0.3s' }}>
                  Blog
                </Link>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <Link to="/profile" style={{ color: '#999', textDecoration: 'none', fontSize: '14px', transition: 'color 0.3s' }}>
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* CTA Section */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h6 style={{ 
              color: '#ffffff', 
              fontSize: '16px', 
              fontWeight: '600',
              marginBottom: '20px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Ready to Start?
            </h6>
            <p style={{ 
              color: '#999', 
              fontSize: '14px', 
              lineHeight: '1.6',
              marginBottom: '20px'
            }}>
              Join thousands of students who have successfully cracked their dream jobs with InstaIQ.
            </p>
                         <Link 
               to="/register" 
               style={{
                 display: 'inline-block',
                 background: 'linear-gradient(135deg, #4c1864 0%, #6a1b9a 100%)',
                 color: '#ffffff',
                 padding: '12px 24px',
                 borderRadius: '6px',
                 textDecoration: 'none',
                 fontSize: '14px',
                 fontWeight: '500',
                 textTransform: 'uppercase',
                 letterSpacing: '0.5px',
                 transition: 'all 0.3s ease',
                 border: 'none'
               }}
               onMouseOver={(e) => {
                 e.target.style.transform = 'translateY(-2px)';
                 e.target.style.boxShadow = '0 4px 12px rgba(76, 24, 100, 0.3)';
               }}
               onMouseOut={(e) => {
                 e.target.style.transform = 'translateY(0)';
                 e.target.style.boxShadow = 'none';
               }}
             >
               Register Now
             </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid #333',
          paddingTop: '20px',
          textAlign: 'center'
        }}>
          <div className="row align-items-center">
            <div className="col-md-6 text-md-left text-center mb-2">
              <p style={{ 
                color: '#666', 
                fontSize: '12px', 
                margin: 0
              }}>
                © 2024 InstaIQ. All rights reserved.
              </p>
            </div>
            <div className="col-md-6 text-md-right text-center">
              <a 
                href="https://instaiq.in" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  color: '#666', 
                  textDecoration: 'none', 
                  fontSize: '12px',
                  transition: 'color 0.3s'
                }}
              >
                instaiq.in
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 