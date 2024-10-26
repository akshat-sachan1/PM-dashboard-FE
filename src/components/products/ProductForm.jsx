import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { createProduct, updateProduct, getProduct } from '../../services/product.service';

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  category: Yup.string().required('Required'),
  price: Yup.number().positive('Must be positive').required('Required'),
  stock: Yup.number().integer('Must be an integer').min(0, 'Must be 0 or greater').required('Required'),
  description: Yup.string().required('Required'),
});

const ProductForm = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  useEffect(() => {
    if (isEditMode) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      const data = await getProduct(id);
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (isEditMode) {
        await updateProduct(id, values);
      } else {
        await createProduct(values);
      }
      navigate('/products');
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (isEditMode && !product) {
    return <div>Loading...</div>;
  }

  const initialValues = isEditMode
    ? product
    : { name: '', category: '', price: '', stock: '', description: '' };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        {isEditMode ? 'Edit Product' : 'Create Product'}
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <Field
                name="name"
                type="text"
                placeholder="Product Name"
                className="w-full px-3 py-2 border rounded-md"
              />
              {errors.name && touched.name && (
                <div className="text-red-500 text-sm">{errors.name}</div>
              )}
            </div>
            <div>
              <Field
                name="category"
                as="select"
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="">Select Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Books">Books</option>
              </Field>
              {errors.category && touched.category && (
                <div className="text-red-500 text-sm">{errors.category}</div>
              )}
            </div>
            <div>
              <Field
                name="price"
                type="number"
                placeholder="Price"
                className="w-full px-3 py-2 border rounded-md"
              />
              {errors.price && touched.price && (
                <div className="text-red-500 text-sm">{errors.price}</div>
              )}
            </div>
            <div>
              <Field
                name="stock"
                type="number"
                placeholder="Stock"
                className="w-full px-3 py-2 border rounded-md"
              />
              {errors.stock && touched.stock && (
                <div className="text-red-500 text-sm">{errors.stock}</div>
              )}
            </div>
            <div>
              <Field
                name="description"
                as="textarea"
                placeholder="Description"
                className="w-full px-3 py-2 border rounded-md"
              />
              {errors.description && touched.description && (
                <div className="text-red-500 text-sm">{errors.description}</div>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
            >
              {isSubmitting ? 'Saving...' : 'Save Product'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProductForm;
