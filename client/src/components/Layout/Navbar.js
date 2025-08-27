import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';

  const handleAdminLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    localStorage.removeItem('adminUsername');
    navigate('/');
    setIsMenuOpen(false);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          <span>🧵</span> Handloom Heritage
        </Link>

        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-item" onClick={closeMenu}>
            Home
          </Link>
          <Link to="/about" className="nav-item" onClick={closeMenu}>
            About
          </Link>
          <Link to="/articles" className="nav-item" onClick={closeMenu}>
            Articles
          </Link>
          <Link to="/contact" className="nav-item" onClick={closeMenu}>
            Contact
          </Link>

          {isAdminLoggedIn ? (
            <div className="nav-admin">
              <Link to="/admin/dashboard" className="nav-item" onClick={closeMenu}>
                ⚙️ Admin Dashboard
              </Link>
              <button onClick={handleAdminLogout} className="btn btn-sm logout-btn">
                🚪 Logout
              </button>
            </div>
          ) : (
            <Link to="/admin/login" className="btn btn-sm admin-btn" onClick={closeMenu}>
              🔐 Admin
            </Link>
          )}
        </div>

        <div 
          className={`nav-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
