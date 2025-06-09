import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { FaBars } from 'react-icons/fa';

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-5  mx-auto">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/home">
          <img src="https://i.postimg.cc/8PBT4fJ9/image.png" alt="logo" width={40} className="me-2" />
          <span className="logo-font fs-4">Tasty Kitchens</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <FaBars />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link" to="/home">Home</Link>
            </li>
            {isAuthenticated && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/cart">Cart</Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-danger ms-lg-3 mt-2 mt-lg-0" type="button" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
                <li className="nav-item ms-2">
                  <span className="navbar-text">{user?.username}</span>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;