const { Order, Product } = require('../models');

// Create a new order
const createOrder = async (req, res) => {
    const { userId, productId, quantity, totalAmount } = req.body;

    try {
        const order = await Order.create({ userId, productId, quantity, totalAmount });
        res.status(201).json(order);
    } catch (error) {
        console.error('Create order error:', error);
        res.status(500).json({ message: 'Error creating order', error: error.message });
    }
};

// Get a specific order by ID
const getOrder = async (req, res) => {
    const { id } = req.params;

    try {
        const order = await Order.findByPk(id, { include: Product });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        console.error('Get order error:', error);
        res.status(500).json({ message: 'Error fetching order', error: error.message });
    }
};

// Get all orders for a user
const getAllOrders = async (req, res) => {
    const { userId } = req.user;

    try {
        const orders = await Order.findAll({ where: { userId }, include: Product });
        res.json(orders);
    } catch (error) {
        console.error('Get all orders error:', error);
        res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
};

// Update the status of an order
const updateOrderStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const [updated] = await Order.update({ status }, { where: { id } });
        if (updated === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json({ message: 'Order status updated successfully' });
    } catch (error) {
        console.error('Update order status error:', error);
        res.status(500).json({ message: 'Error updating order status', error: error.message });
    }
};

// Delete an order
const deleteOrder = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await Order.destroy({ where: { id } });
        if (deleted === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Delete order error:', error);
        res.status(500).json({ message: 'Error deleting order', error: error.message });
    }
};

module.exports = {
    createOrder,
    getOrder,
    getAllOrders,
    updateOrderStatus,
    deleteOrder,
};