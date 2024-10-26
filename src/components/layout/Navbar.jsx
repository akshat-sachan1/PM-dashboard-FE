import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-indigo-600">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white font-bold text-xl">
              Product Dashboard
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/products" className="text-white hover:text-gray-200">
              Products
            </Link>
            {user ? (
              <button
                onClick={handleLogout}
                className="text-white hover:text-gray-200"
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="text-white hover:text-gray-200">
                  Login
                </Link>
                <Link to="/register" className="text-white hover:text-gray-200">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
