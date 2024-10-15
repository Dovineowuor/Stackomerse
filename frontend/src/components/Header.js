import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
const categories = ["Electronics", "Fashion", "Home", "Books", "Toys"];

return (
    <header className="bg-dark text-white p-3">
        <nav className="navbar navbar-expand-lg navbar-dark">
            <Link className="navbar-brand" to="/">
                Stackomerse
            </Link>
            <div className="collapse navbar-collapse">
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
                    <li className="nav-item dropdown">
                        <button className="nav-link dropdown-toggle btn btn-link" id="categoriesDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Categories
                        </button>
                        <div className="dropdown-menu" aria-labelledby="categoriesDropdown">
                            {categories.map((category, index) => (
                                <Link key={index} className="dropdown-item" to={`/categories/${category.toLowerCase()}`}>
                                    {category}
                                </Link>
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
