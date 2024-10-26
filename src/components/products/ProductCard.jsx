import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { deleteProduct } from '../../services/product.service';

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
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-2">{product.category}</p>
        <p className="text-xl font-bold mb-2">₹{product.price}</p>
        <p className="text-gray-500 mb-4">Stock: {product.stock}</p>
        <p className="text-gray-700 mb-4 line-clamp-2">{product.description}</p>
        
        <div className="flex justify-between items-center">
          <Link
            to={`/products/${product.id}`}
            className="text-indigo-600 hover:text-indigo-800"
          >
            View Details
          </Link>
          {user && (
            <div className="space-x-2">
              <Link
                to={`/products/${product.id}/edit`}
                className="text-yellow-600 hover:text-yellow-800"
              >
                Edit
              </Link>
              <button
                onClick={handleDelete}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
