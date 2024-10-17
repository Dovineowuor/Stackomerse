import React, { useEffect, useState } from 'react';
import { fetchCartAPI, updateCartItemAPI } from '../api/cartApi'; // Import the API functions
import '../index.css';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const data = await fetchCartAPI(); // Fetch cart items using the API
                setCartItems(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, []);

    const handleQuantityChange = async (cartItemId, newQuantity) => {
        try {
            // Update the cart item with the new quantity
            const updatedItemData = { quantity: newQuantity };
            const updatedItem = await updateCartItemAPI(cartItemId, updatedItemData);
            // Update the cartItems state with the modified item
            setCartItems((prevItems) =>
                prevItems.map((item) =>
                    item.id === updatedItem.id ? updatedItem : item
                )
            );
        } catch (error) {
            setError(error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (cartItems.length === 0) {
        return <div className='container-fluid h-100 w-100 col-md-12 text-center'> <center>Your cart is empty.</center> </div>;
    }

    return (
        <>
            {/* Breadcrumb Navigation */}
            <section className="page_menu">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h3 className="hidden">hidden</h3>
                            <ul className="breadcrumb">
                                <li><a href="index.html">Home</a></li>
                                <li>Products</li>
                                <li className="active">Shopping Cart</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Cart Items */}
            <section className="cart">
                <div className="container">
                    <h2>Your Shopping Cart</h2>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map(item => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>${item.price.toFixed(2)}</td>
                                    <td>
                                        <input 
                                            type="number" 
                                            value={item.quantity} 
                                            min="1" 
                                            className="form-control" 
                                            onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                                        />
                                    </td>
                                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                                    <td>
                                        <button className="btn btn-danger">Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Cart Total */}
                    <div className="cart-total">
                        <h3>Total: ${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</h3>
                        <button className="btn btn-primary">Proceed to Checkout</button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default CartPage;
