import React from 'react';
import { useAlert } from '../../context/AlertContext';
import './Alert.css';

const Alert = () => {
  const { alerts, removeAlert } = useAlert();

  if (alerts.length === 0) return null;

  return (
    <div className="alert-container">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`alert alert-${alert.type}`}
          onClick={() => removeAlert(alert.id)}
        >
          <span>{alert.message}</span>
          <button className="alert-close">&times;</button>
        </div>
      ))}
    </div>
  );
};

export default Alert;
