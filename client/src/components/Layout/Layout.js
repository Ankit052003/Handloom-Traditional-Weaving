import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Alert from '../Common/Alert';

const Layout = ({ children }) => {
  return (
    <div className="app-layout">
      <Navbar />
      <Alert />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
