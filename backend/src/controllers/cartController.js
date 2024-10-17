const { Product } = require('../models/productModel');
const { Cart } = require('../models/cartModel');

/**
 * Add a product to the cart
 * 
 * @param {Object} req - The request object containing userId, productId, and quantity
 * @param {Object} res - The response object
 * @returns {Object} The response object
 */
const addProductToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user.id; // Extract user ID from the authenticated user

    if (!productId || !quantity) {
        return res.status(400).json({ message: 'Product ID and quantity are required' });
    }

    try {
        // Check if the product exists and is in stock
        const product = await Product.findByPk(productId);
        if (!product) {
            if (req.accepts('html')) {
                return res.status(404).render('404'); // Server-side render 404 page
            } else {
                return res.status(404).json({ message: 'Product not found' }); // Client-side render 404
            }
        }
        if (quantity > product.stock) {
            if (req.accepts('html')) {
                return res.status(400).render('400'); // Server-side render 400 page
            } else {
                return res.status(400).json({ message: 'Quantity exceeds stock' }); // Client-side render 400
            }
        }

        // Create or update the cart item
        const [cartItem, created] = await Cart.upsert({
            userId,
            productId,
            quantity,
        }, {
            returning: true // Get the created or updated instance
        });

        if (created) {
            return res.status(201).json(cartItem); // Item added to cart
        } else {
            return res.status(200).json(cartItem); // Item updated
        }
    } catch (error) {
        console.error('Add to cart error:', error);
        res.status(500).render('500'); // Render 500 error page
    }
};

/**
 * Get all cart items for a user
 * 
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Object} The response object
 */
const getCart = async (req, res) => {
    const userId = req.user.id;

    try {
        const cartItems = await Cart.findAll({
            where: { userId },
            include: { model: Product } // Include product details
        });
        res.status(200).json(cartItems);
    } catch (error) {
        console.error('Get cart error:', error);
        res.status(500).json({ message: 'Error fetching cart', error: error.message });
    }
};

/**
 * Update a cart item
 * 
 * @param {Object} req - The request object containing cart item ID and new quantity
 * @param {Object} res - The response object
 * @returns {Object} The response object
 */
const updateCart = async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;
    const userId = req.user.id;

    if (!quantity) {
        return res.status(400).json({ message: 'Quantity is required' });
    }

    try {
        const cartItem = await Cart.findOne({ where: { id, userId } });
        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        const product = await Product.findByPk(cartItem.productId);
        if (quantity > product.stock) {
            return res.status(400).json({ message: 'Quantity exceeds stock' });
        }

        cartItem.quantity = quantity;
        await cartItem.save();
        res.status(200).json({ message: 'Cart item updated successfully', cartItem });
    } catch (error) {
        console.error('Update cart error:', error);
        res.status(500).json({ message: 'Error updating cart', error: error.message });
    }
};

/**
 * Remove a product from the cart
 * 
 * @param {Object} req - The request object containing cart item ID
 * @param {Object} res - The response object
 * @returns {Object} The response object
 */
const removeProductFromCart = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const cartItem = await Cart.findOne({ where: { id, userId } });
        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        await cartItem.destroy();
        res.status(200).json({ message: 'Cart item removed successfully' });
    } catch (error) {
        console.error('Remove from cart error:', error);
        res.status(500).json({ message: 'Error removing from cart', error: error.message });
    }
};

// Export the controller functions
module.exports = {
    addProductToCart,
    getCart,
    updateCart,
    removeProductFromCart,
};