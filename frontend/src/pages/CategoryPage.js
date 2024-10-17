import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { useParams, Link } from 'react-router-dom';

const CategoryPage = () => {
  const { id } = useParams(); // Get the category ID from the URL
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // State to store categories
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/api/products/category/${id}`); // Fetch products by category
        setProducts(response.data);
      } catch (error) {
        setError('Failed to load products for this category');
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/categories'); // Fetch all categories
        setCategories(response.data);
      } catch (error) {
        setError('Failed to load categories');
      }
    };

    const fetchData = async () => {
      await Promise.all([fetchCategoryProducts(), fetchCategories()]); // Fetch both products and categories
      setLoading(false); // Set loading to false after both requests
    };

    fetchData();
  }, [id]);

  if (loading) return <div className="text-center">Loading...</div>; // Bootstrap text-center for loading
  if (error) return <div className="text-danger text-center">{error}</div>; // Bootstrap text-danger for error

  const colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];

  return (
    <div className="category-page">
      <main className="container">
        <h2 className="text-center my-4">Products in this Category</h2> {/* Center the title with margin */}
        <div className="row">
          {/* Left Sidebar for Categories */}
          <aside className="col-md-3 col-sm-3">
            <div className="widget content_space">
              <h4 className="heading uppercase mb-3">Categories</h4>
              <ul className="list-unstyled">
                {categories.map((category) => {
                  // Randomly select a color from the colors array
                  const randomColor = colors[Math.floor(Math.random() * colors.length)];
                  return (
                    <li key={category.id} className="mb-2">
                      <Link to={`/category/${category.id}`} className={`badge rounded-pill bg-${randomColor}-subtle text-dark`}>
                        {category.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>
          
          {/* Main Products Area */}
          <div className="col-md-9 col-sm-9">
            <div className="row">
              {products.length > 0 ? (
                products.map(product => (
                  <div key={product.id} className="col-md-4 col-sm-6 mb-4"> {/* Adjusted for responsive grid */}
                    <ProductCard product={product} />
                  </div>
                ))
              ) : (
                <div className="col-12 text-center">No products found in this category.</div> // Message for empty category
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CategoryPage;
