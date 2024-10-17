import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <article className="col-md-6 col-lg-4 col-xl-3">
      <div id={`product-${product.id}`} className="single-product">
        <div className="part-1">
            <img 
              className="product-image" 
              src={product.imageUrl || process.env.PUBLIC_URL + '/red-tshirt.png'} // Use a placeholder if imageUrl is null
              alt={product.name} 
          />
          <ul className='container-fluid d-flex flex-row justify-content-center align-items-center pl-0'>
            <li><Link to={`/cart/add/${product.id}`}><i className="fas fa-shopping-cart"></i></Link></li>
            <li><Link to={`/favorites/${product.id}`}><i className="fas fa-heart"></i></Link></li>
            <li><Link to={`/product/${product.id}`}><i className="fas fa-plus"></i></Link></li>
            <li><Link to={`/product/${product.id}`}><i className="fas fa-expand"></i></Link></li>
          </ul>
        </div>
        <div className="part-2 p-3">
          <h3 className="product-title">{product.name}</h3>
          {product.stock > 0 ? (
            <>
              <h4 className="product-old-price text-danger">${(product.price * 1.2).toFixed(2)}</h4>
              <h4 className="product-price">${product.price.toFixed(2)}</h4>
            </>
          ) : (
            <h4 className="product-price">Out of Stock</h4>
          )}
          <Link to={`/product/${product.id}`} className="btn btn-primary">View Details</Link>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
