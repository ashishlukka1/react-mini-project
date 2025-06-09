import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';

function RootLayout({ children }) {
  const location = useLocation();
  const isLogin = location.pathname === '/login';

  return (
    <div className="app-root-layout d-flex flex-column min-vh-100">
      {!isLogin && <Navbar />}
      <main className="flex-grow-1 d-flex flex-column" style={{ minHeight: '70vh' }}>
        {children}
      </main>
      {!isLogin && <Footer />}
    </div>
  );
}

export default RootLayout;