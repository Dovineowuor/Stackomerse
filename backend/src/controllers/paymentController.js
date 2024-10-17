// sr// src/controllers/paymentController.js
const { Payment } = require('../models/paymentModel');

const createPayment = async (req, res) => {
    const { amount, method, status } = req.body;
    const userId = req.user.id;

    try {
        const payment = await Payment.create({ userId, amount, method, status });
        res.status(201).json(payment);
    } catch (error) {
        console.error('Error creating payment:', error);
        res.status(500).json({ message: 'Error creating payment', error: error.message });
    }
};

const getPayments = async (req, res) => {
    const userId = req.user.id;

    try {
        const payments = await Payment.findAll({ where: { userId } });
        res.status(200).json(payments);
    } catch (error) {
        console.error('Error fetching payments:', error);
        res.status(500).json({ message: 'Error fetching payments', error: error.message });
    }
};

const getPaymentById = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const payment = await Payment.findOne({ where: { id, userId } });
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        res.status(200).json(payment);
    } catch (error) {
        console.error('Error fetching payment:', error);
        res.status(500).json({ message: 'Error fetching payment', error: error.message });
    }
};

const updatePayment = async (req, res) => {
    const { id } = req.params;
    const { amount, method, status } = req.body;
    const userId = req.user.id;

    try {
        const payment = await Payment.findOne({ where: { id, userId } });
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        payment.amount = amount || payment.amount;
        payment.method = method || payment.method;
        payment.status = status || payment.status;

        await payment.save();
        res.status(200).json(payment);
    } catch (error) {
        console.error('Error updating payment:', error);
        res.status(500).json({ message: 'Error updating payment', error: error.message });
    }
};

const deletePayment = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const payment = await Payment.findOne({ where: { id, userId } });
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        await payment.destroy();
        res.status(200).json({ message: 'Payment deleted successfully' });
    } catch (error) {
        console.error('Error deleting payment:', error);
        res.status(500).json({ message: 'Error deleting payment', error: error.message });
    }
};

module.exports = {
    createPayment,
    getPayments,
    getPaymentById,
    updatePayment,
    deletePayment,
};