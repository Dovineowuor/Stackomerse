// src/pages/CheckoutPage.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPayments, createPayment } from '../redux/actions/paymentAction.js'; // Correct import path
import { selectPayments, selectPaymentLoading, selectPaymentError } from '../redux/actions/paymentSelector'; // Correct import path

const CheckoutPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    const dispatch = useDispatch();
    const paymentMethods = useSelector(selectPayments);
    const loading = useSelector(selectPaymentLoading);
    const error = useSelector(selectPaymentError);

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/cart/all'); // Updated endpoint
                const cartData = await response.json();
                populateCartItems(cartData);
            } catch (error) {
                console.error('Error fetching cart data:', error);
            }
        };

        const populateCartItems = (cartData) => {
            let total = 0;
            const items = cartData.map(item => {
                const product = item.Product;
                const itemTotal = product.price * item.quantity;
                total += itemTotal;
                return {
                    ...item,
                    product,
                    itemTotal
                };
            });
            setCartItems(items);
            setTotalAmount(total);
        };

        fetchCartData();
        dispatch(fetchPayments());
    }, [dispatch]);

    const handlePaymentMethodChange = (e) => {
        setSelectedPaymentMethod(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createPayment({ amount: totalAmount, method: selectedPaymentMethod, status: 'pending' }));
    };

    return (
        <section id="cart" className="padding">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h4 className="heading uppercase marginbottom15">Shopping cart</h4>
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th className="uppercase">Product photo</th>
                                        <th className="uppercase">Product name</th>
                                        <th className="uppercase">Description</th>
                                        <th className="uppercase">Price</th>
                                        <th className="uppercase">Quantity</th>
                                        <th className="uppercase">Total Price</th>
                                        <th className="uppercase"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                                <img className="shopping-product" src={item.product.imageUrl || "images/cart-table1.jpg"} alt="your product" />
                                            </td>
                                            <td className="product-name">
                                                <h5>{item.product.name}</h5>
                                            </td>
                                            <td><p>{item.product.description}</p></td>
                                            <td className="price">
                                                <h5>${item.product.price.toFixed(2)}</h5>
                                            </td>
                                            <td>
                                                <div className="input-group spinner">
                                                    <input type="text" className="form-control" value={item.quantity} readOnly />
                                                    <div className="input-group-btn-vertical">
                                                        <div className="btn"><i className="fa fa-angle-up"></i></div>
                                                        <div className="btn"><i className="fa fa-angle-down"></i></div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="price">
                                                <h5>${item.itemTotal.toFixed(2)}</h5>
                                            </td>
                                            <td className="text-center"><a className="btn-close" href="#."><i className="fa fa-close"></i></a></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="row pb-4">
                            <div className="col-sm-6">
                                <a href="#." className="btn btn-light btn-pill margintop30">CONTINUE SHOPPING</a>
                            </div>
                            <div className="col-sm-3 text-right">
                                <a href="#." className="btn btn-success-subtle btn-pill margintop30">UPDATE CART</a>
                            </div>
                            <div className="col-sm-3 text-right">
                                <a href="#." className="btn btn-danger btn-pill margintop30">CLEAR CART</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4">
                        <div className="shop_measures margintop40">
                            <h4 className="heading uppercase bottom30">Calculate shipping</h4>
                            <form className="cart-form">
                                <div className="row">
                                    <div className="col-md-12 form-group">
                                        <label htmlFor="country" className='text-caption'>Which country are you located in?</label>
                                        <input type="text" className="form-control" id="country" placeholder="Country" required="" />
                                    </div>
                                    <div className="col-md-6 form-group mb-2">
                                        <label htmlFor="city">Select your State</label>
                                        <select name="country" id="city" className="form-control">
                                            <option>Nairobi</option>
                                            <option>Mombasa</option>
                                            <option>Kisumu</option>
                                            <option>Other</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <label htmlFor="zip">Mail</label>
                                        <input type="text" className="form-control" id="zip" placeholder="Zip Code" required="" />
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <input type="submit" className="btn btn-primary btn-pill margintop30 mb-2" value="Update Shipping" />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="shop_measures margintop40">
                            <h4 className="heading uppercase bottom30">Coupon Code</h4>
                            <p className="bottom_half caption">Apply coupon code to get discount</p>
                            <form className="cart-form">
                                <div className="row">
                                    <div className="col-md-12 form-group">
                                        <label htmlFor="coupon-code">Coupon Code</label>
                                        <input type="text" className="form-control mb-2" id="coupon-code" placeholder="eg. 98F101192" required="" />
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <input type="submit" className="btn btn-dark btn-pill margintop30" value="Redeem Code" />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="shop_measures margintop40 mb-5">
                            <h4 className="heading uppercase bottom30">Payment Method</h4>
                            <form className="cart-form">
                                <div className="form-group">
                                    <label htmlFor="payment-method">Select Payment Method</label>
                                    {loading ? (
                                        <p>Loading payment methods...</p> // Show loading message
                                    ) : error ? (
                                        <p style={{ color: 'red' }}>Error fetching payment methods: {error}</p> // Show error message
                                    ) : (
                                        <select
                                            id="payment-method"
                                            className="form-control"
                                            value={selectedPaymentMethod}
                                            onChange={handlePaymentMethodChange}
                                            required
                                        >
                                            <option value="">Select a payment method</option>
                                            {paymentMethods.map((method) => (
                                                <option key={method.id} value={method.name}>
                                                    {method.name}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                </div>
                            </form>
                            <h4 className="heading uppercase bottom30">Cart Totals</h4>
                            <table className="table table-responsive">
                                <tbody>
                                    <tr>
                                        <td>Cart Subtotal</td>
                                        <td className="text-right"><h5>${totalAmount.toFixed(2)}</h5></td>
                                    </tr>
                                    <tr>
                                        <td>Shipping and Handling</td>
                                        <td className="text-right"><h5>Ksh. 100.00</h5></td>
                                    </tr>
                                    <tr>
                                        <td>Cart Totals</td>
                                        <td className="text-right"><h5 className="price">Ksh. {totalAmount + 100.00}</h5></td>
                                    </tr>
                                </tbody>
                            </table>
                            <button className="btn btn-danger btn-pill margintop30" onClick={handleSubmit}>Proceed to Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CheckoutPage;
