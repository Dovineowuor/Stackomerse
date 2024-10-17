import React, { useEffect, useState } from 'react';
import '../index.css'; // Ensure you have this CSS file for styling

const ProductPage = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const categoryId = "572f712b-1cb7-474d-bb92-bc0cf16466b5"; // Category ID

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/api/products/category/${categoryId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                // Assuming the API returns an array of products, we'll take the first one
                const productData = data[0];
                setProduct(productData);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [categoryId]); // Fetch when category ID changes

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!product) {
        return <div>No product found.</div>;
    }

    const { name, description, price, imageUrls = [], stock } = product;

    return (
        <>
            <section className="product-detail">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            {/* Image Gallery */}
                            <div className="image-gallery">
                                {imageUrls.length > 0 ? (
                                    imageUrls.map((url, index) => (
                                        <img
                                            key={index}
                                            src={url}
                                            alt={`${name} ${index + 1}`}
                                            className="img-fluid"
                                        />
                                    ))
                                ) : (
                                    <img  className="product-image" 
                                    src={product.imageUrl || process.env.PUBLIC_URL + '/red-tshirt.png'} // Use a placeholder if imageUrl is null
                                    alt={product.name}  />
                                )}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <h2>{name}</h2>
                            <p>{description}</p>
                            <h3>${price.toFixed(2)}</h3>
                            <p>{stock > 0 ? 'In Stock' : 'Out of Stock'}</p>
                            <button className="btn btn-dark" disabled={stock === 0}>
                                {stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                            </button>

                            {/* Size and Color Options */
                            
                            }
                            <div className="options mt-3">
                                <div>
                                    <div className='text-muted'> Product Options</div>
                                    <label htmlFor="size">Size:</label>
                                    <select id="size" className="form-control">
                                        <option value="">Select Size</option>
                                        <option value="s">Small</option>
                                        <option value="m">Medium</option>
                                        <option value="l">Large</option>
                                        <option value="xl">Extra Large</option>
                                    </select>
                                </div>
                                <div className="mt-2">
                                    <label htmlFor="color">Color:</label>
                                    <select id="color" className="form-control">
                                        <option value="">Select Color</option>
                                        <option value="red">Red</option>
                                        <option value="blue">Blue</option>
                                        <option value="green">Green</option>
                                        <option value="black">Black</option>
                                    </select>
                                </div>
                            </div>
                            </div>
                            </div>
                            </div>
                            </section>

                            <section className="reviews">
                                <div className="container">
                                    <h2>Reviews</h2>
                                    <div className="review_list">
                                        <ol>
                                            <li>
                                                <div className="avatar clearfix w-25">
                                                    <img 
                                                        className="product-image" 
                                                        src={product.imageUrl || process.env.PUBLIC_URL + '/red-tshirt.png'} // Use a placeholder if imageUrl is null
                                                        alt={product.name} 
                                                        style={{ width: '60px', height: '60px' }} // Custom style for image size
                                                    />
                                                </div>
                                                <div className="comment-content">
                                                    <span className="stars">
                                                        {/* Font Awesome Star Icons */}
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="far fa-star"></i> {/* Half Star */}
                                    </span>
                                    <div className="author-name">John Doe</div>
                                    <p className="comment-text">
                                        Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
                                    </p>
                                </div>
                            </li>
                            <li>
                                <div className="avatar clearfix">
                                    <img src="/frontend/public/red-tshirt.png" className="img-fluid border-radius rounded-circle" alt="Reviewer" />
                                </div>
                                <div className="comment-content">
                                    <span className="stars">
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="far fa-star"></i>
                                        <i className="far fa-star"></i>
                                    </span>
                                    <div className="author-name">Jane Doe</div>
                                    <p className="comment-text">
                                        Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
                                    </p>
                                </div>
                            </li>
                        </ol>
                        {/* Placeholder for review count */}
                        <p>Total Reviews: 2</p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ProductPage;
