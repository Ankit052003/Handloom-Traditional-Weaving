import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Handloom Heritage Foundation</h3>
            <p>
              Preserving traditional handloom weaving and supporting artisan communities 
              through sustainable textile practices.
            </p>
          </div>
          
          <div className="footer-section">
            <h4>Our Mission</h4>
            
              <li>Preserve weaving techniques</li>
              <li>Support artisan communities</li>
              <li>Promote sustainable textiles</li>
          
          </div>
          
          <div className="footer-section">
            <h4>Resources</h4>
            
              <li><a href="/about">History & Importance</a></li>
              <li><a href="/articles">Research Articles</a></li>
              <li><a href="/contact">Contact Us</a></li>
        
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>
            &copy; 2025 Handloom Heritage Foundation. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
