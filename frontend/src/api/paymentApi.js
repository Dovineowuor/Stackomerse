// Fetch all payments
export const fetchPaymentsAPI = async () => {
    const response = await fetch('http://localhost:5000/api/payments/', {
        method: 'GET',
    });
    if (!response.ok) {
        throw new Error('Failed to fetch payments');
    }
    return await response.json();
};

// Fetch payment by ID
export const fetchPaymentByIdAPI = async (paymentId) => {
    const response = await fetch(`http://localhost:5000/api/payments/${paymentId}`, {
        method: 'GET',
    });
    if (!response.ok) {
        throw new Error('Failed to fetch payment');
    }
    return await response.json();
};
