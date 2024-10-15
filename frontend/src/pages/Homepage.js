import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Example product data fetch
    const fetchProducts = async () => {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mt-5">
      <h1>Welcome to Stackomerse</h1>
      <div className="row">
        {products.map(product => (
          <div key={product.id} className="col-md-4">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
