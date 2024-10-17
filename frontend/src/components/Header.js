import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Updated to useNavigate

// Assuming you have a fetchCategoriesAPI method in api/categoryApi.js
import { fetchCategoriesAPI } from '../api/categoryApi'; 

const Header = () => {
    const [categories, setCategories] = useState([]); // State to hold fetched categories
    const navigate = useNavigate(); // Updated to useNavigate

    // Fetch categories from the API on component mount
    useEffect(() => {
        const getCategories = async () => {
            try {
                const categoriesData = await fetchCategoriesAPI(); // Fetch categories
                setCategories(categoriesData);
            } catch (error) {
                console.error("Error fetching categories", error);
            }
        };
        getCategories();
    }, []);

    // Handle category click and navigate to category products page
    const handleCategoryClick = (categoryId) => {
        navigate(`/categories/${categoryId}`); // Updated to use navigate
    };

    return (
        <header className="bg-dark text-white p-3">
            <nav className="navbar navbar-expand-lg navbar-dark">
                <Link className="navbar-brand" to="/">
                    Stackomerse
                </Link>
                
                {/* Toggle button for mobile view */}
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Collapsible section */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/cart">Cart</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/profile">Profile</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/products">Products</Link>
                        </li>

                        {/* Categories dropdown fetched from API */}
                        <li className="nav-item dropdown">
                            <button className="nav-link dropdown-toggle btn btn-link" id="categoriesDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Categories
                            </button>
                            <div className="dropdown-menu" aria-labelledby="categoriesDropdown">
                                {categories.map((category) => (
                                    <button 
                                        key={category.id} 
                                        className="dropdown-item" 
                                        onClick={() => handleCategoryClick(category.id)}
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </div>
                        </li>
                        
                        <li className="nav-item">
                            <Link className="nav-link" to="/orders">Orders</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;
