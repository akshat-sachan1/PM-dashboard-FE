import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { deleteProduct } from '../../services/product.service';
import { motion } from 'framer-motion';

const ProductCard = ({ product, onUpdate }) => {
  const { user } = useAuth();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(product.id);
        onUpdate();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-2">{product.category}</p>
        <p className="text-xl font-bold mb-2">₹{product.price}</p>
        <p className="text-gray-500 mb-4">Stock: {product.stock}</p>
        <p className="text-gray-700 mb-4 line-clamp-2">{product.description}</p>
        
        <div className="flex justify-between items-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to={`/products/${product.id}`}
              className="text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              View Details
            </Link>
          </motion.div>
          {user && (
            <div className="space-x-2">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                <Link
                  to={`/products/${product.id}/edit`}
                  className="text-yellow-600 hover:text-yellow-800 transition-colors"
                >
                  Edit
                </Link>
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDelete}
                className="text-red-600 hover:text-red-800 transition-colors"
              >
                Delete
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;