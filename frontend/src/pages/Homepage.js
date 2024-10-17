import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard'; // Adjust the path as needed
import { Link } from 'react-router-dom'; // Import Link for navigation

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/products'); // Replace with your actual API endpoint
        setProducts(response.data);
      } catch (error) {
        setError('Failed to load products');
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/categories/'); // Replace with your actual API endpoint
        setCategories(response.data);
      } catch (error) {
        setError('Failed to load categories');
      }
    };

    const fetchData = async () => {
      await fetchProducts();
      await fetchCategories();
      setLoading(false); // Set loading to false after both requests
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];

  return (
    <div className="homepage">
      <main className="container">
        <div className="row">
          {/* Left Sidebar for Categories */}
          <aside className="col-md-3 col-sm-3">
            <div className="widget content_space">
              <h4 className="heading uppercase bottom30">Categories</h4>
              <ul className="list-unstyled">
                {categories.map((category) => {
                  // Randomly select a color from the colors array
                  const randomColor = colors[Math.floor(Math.random() * colors.length)];
                  return (
                    <li key={category.id} className="mb-1">
                      <Link to={`/category/${category.id}`} className={`badge rounded-pill bg-${randomColor}-subtle text-dark`}>
                        {category.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="col-md-9 col-sm-9">
            <section className="section-products">
              <div className="header text-center">
                <h3>Featured Product</h3>
                <h2>Popular Products</h2>
              </div>
              <div className="row">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Homepage;
