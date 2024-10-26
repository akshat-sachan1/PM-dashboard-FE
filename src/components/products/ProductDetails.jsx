import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProduct } from '../../services/product.service';

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const data = await getProduct(id);
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="text-gray-600 mb-2">Category: {product.category}</p>
        <p className="text-2xl font-bold mb-2">₹{product.price}</p>
        <p className="text-gray-700 mb-4">{product.description}</p>
        <p className="text-gray-600 mb-4">Stock: {product.stock}</p>
        <div className="flex justify-between">
          <Link
            to="/products"
            className="text-indigo-600 hover:text-indigo-800"
          >
            Back to Products
          </Link>
          <Link
            to={`/products/${product.id}/edit`}
            className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
          >
            Edit Product
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
