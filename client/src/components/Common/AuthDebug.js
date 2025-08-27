import React from 'react';
import { useAuth } from '../../context/AuthContext';

const AuthDebug = () => {
  const { user, isAuthenticated, isAdmin, loading } = useAuth();

  if (process.env.NODE_ENV !== 'development') {
    return null; // Only show in development
  }

  return (
    <div style={{
      position: 'fixed',
      top: '80px',
      right: '20px',
      background: '#1e293b',
      color: 'white',
      padding: '15px',
      borderRadius: '8px',
      fontSize: '12px',
      zIndex: 9999,
      minWidth: '200px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
    }}>
      <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>🔧 Auth Debug</div>
      <div>Loading: {loading ? 'Yes' : 'No'}</div>
      <div>Authenticated: {isAuthenticated ? 'Yes' : 'No'}</div>
      <div>Is Admin: {isAdmin ? 'Yes' : 'No'}</div>
      <div>User: {user ? JSON.stringify({
        id: user.id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin
      }, null, 2) : 'null'}</div>
      <div style={{ marginTop: '10px', fontSize: '10px', opacity: 0.7 }}>
        Token: {localStorage.getItem('token') ? 'Present' : 'Missing'}
      </div>
    </div>
  );
};

export default AuthDebug;
