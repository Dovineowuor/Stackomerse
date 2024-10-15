import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../redux/actions/productActions';

const ProductsPage = () => {
  const dispatch = useDispatch();
  
  // Fetch the product state from the Redux store
  const { products, loading, error } = useSelector(state => state.product);

  useEffect(() => {
    // Dispatch the action to fetch products when the page loads
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Product Catalogue</h1>
      
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <>
          {/* Hero Section */}
          <div className="hero mb-3">
            <img src="https://via.placeholder.com/1600x400" alt="Hero" className="img-fluid" />
          </div>

          {/* Breadcrumb Navigation */}
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="/">Home</a></li>
              <li className="breadcrumb-item active" aria-current="page">Products</li>
            </ol>
          </nav>

          {/* Product Grid */}
          <div className="row">
            {products.map(product => (
              <div key={product.id} className="col-md-4">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductsPage;
