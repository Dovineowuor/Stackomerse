import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/Homepage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <Router>
      <Header
        title="Stackomerse"
        description="The best place to buy all your tech needs."
      />
      <main className="container mt-5 nav-bar">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path = "/register" element = {<RegisterPage />} />
          <Route path = "/profile" element = {<ProfilePage />} />
          
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
