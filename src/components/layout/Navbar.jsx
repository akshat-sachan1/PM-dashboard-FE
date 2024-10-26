import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <motion.nav
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white font-bold text-xl">
              Product Dashboard
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/products" className="text-white hover:text-gray-200 transition-colors">
              Products
            </Link>
            {user ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="text-white hover:text-gray-200 transition-colors"
              >
                Logout
              </motion.button>
            ) : (
              <>
                <Link to="/login" className="text-white hover:text-gray-200 transition-colors">
                  Login
                </Link>
                <Link to="/register" className="text-white hover:text-gray-200 transition-colors">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
