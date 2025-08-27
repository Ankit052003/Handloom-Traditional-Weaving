import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Import images
import googleIcon from '../../assets/google.png';
import appleIcon from '../../assets/apple.png';
import backgroundImage from '../../assets/home.jpg';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Simple hardcoded admin credentials
  const ADMIN_USERNAME = 'admin';
  const ADMIN_PASSWORD = 'admin123';

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simple authentication check
    if (formData.username === ADMIN_USERNAME && formData.password === ADMIN_PASSWORD) {
      // Store login status in localStorage
      localStorage.setItem('isAdminLoggedIn', 'true');
      localStorage.setItem('adminUsername', formData.username);

      // Redirect to admin dashboard
      navigate('/admin/dashboard');
    } else {
      setError('Invalid username or password');
    }

    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
      {/* Left Side - Form */}
      <div style={{
        flex: '1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: '40px'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '400px'
        }}>
          {/* Header with logo/icon */}
          <div style={{ marginBottom: '40px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '24px'
            }}>
              <span style={{
                fontSize: '24px',
                fontWeight: 'bold'
              }}></span>
              <span style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#1a1a1a'
              }}>
              </span>
            </div>
            
            <h2 style={{ 
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#1a1a1a',
              margin: '0 0 8px 0',
              lineHeight: '1.2',
              textAlign: 'center'
            }}>
              Sign in
            </h2>
            <p style={{ 
              color: '#6b7280',
              fontSize: '16px',
              margin: '0',
              fontWeight: '400'
            }}>
            </p>
          </div>

          {error && (
            <div style={{
              background: '#fee2e2',
              border: '1px solid #fca5a5',
              color: '#dc2626',
              padding: '12px',
              borderRadius: '8px',
              marginBottom: '24px',
              textAlign: 'center',
              fontSize: '14px'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '6px', 
                fontWeight: '500',
                color: '#374151',
                fontSize: '14px'
              }}>
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  boxSizing: 'border-box',
                  backgroundColor: 'white'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#3b82f6';
                  e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
                required
              />
            </div>

           
            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '6px', 
                fontWeight: '500',
                color: '#374151',
                fontSize: '14px'
              }}>
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  boxSizing: 'border-box',
                  backgroundColor: 'white'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#3b82f6';
                  e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
                required
              />
              <p style={{
                fontSize: '12px',
                color: '#6b7280',
                margin: '6px 0 0 0'
              }}>
                Must be at least 8 characters.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '14px',
                background: loading ? '#9ca3af' : '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                marginBottom: '20px'
              }}
              onMouseOver={(e) => !loading && (e.target.style.backgroundColor = '#1d4ed8')}
              onMouseOut={(e) => !loading && (e.target.style.backgroundColor = '#2563eb')}
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>

            {/* Social login buttons */}
            <button
              type="button"
              style={{
                width: '100%',
                padding: '12px',
                background: 'white',
                color: '#374151',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#f9fafb';
                e.target.style.borderColor = '#9ca3af';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'white';
                e.target.style.borderColor = '#d1d5db';
              }}
            >
              <img src={googleIcon} alt="Google" style={{ width: '20px', height: '20px' }} />
              Sign in with Google
            </button>

            <button
              type="button"
              style={{
                width: '100%',
                padding: '12px',
                background: '#000000',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#1f2937'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#000000'}
            >
              <img src={appleIcon} alt="Apple" style={{ width: '20px', height: '20px' }} />
              Sign in with Apple
            </button>

            <div style={{ textAlign: 'center' }}>
              <span style={{ color: '#6b7280', fontSize: '14px' }}>
                Already have an account? 
              </span>
              <a href="#" style={{ 
                color: '#2563eb', 
                textDecoration: 'none',
                fontWeight: '500',
                marginLeft: '4px'
              }}>
                Log in
              </a>
            </div>
          </form>

          {/* Demo credentials info */}
          <div style={{
            marginTop: '30px',
            textAlign: 'center',
            padding: '16px',
            background: '#f8fafc',
            borderRadius: '8px',
            border: '1px solid #e2e8f0'
          }}>
            <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#64748b' }}>
              <strong>Demo Credentials:</strong>
            </p>
            <p style={{ margin: '0', fontSize: '12px', color: '#64748b' }}>
              Username: admin<br />
              Password: admin123
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div style={{
        flex: '1',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh'
      }}>
        {/* Optional overlay for better image contrast */}
        <div style={{
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.1)'
        }}></div>
      </div>
    </div>
  );
};

export default AdminLogin;
