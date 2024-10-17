// Fetch all orders
export const fetchOrdersAPI = async () => {
    const response = await fetch('http://localhost:5000/api/orders/', {
        method: 'GET',
    });
    if (!response.ok) {
        throw new Error('Failed to fetch orders');
    }
    return await response.json();
};

// Fetch order by ID
export const fetchOrderByIdAPI = async (orderId) => {
    const response = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
        method: 'GET',
    });
    if (!response.ok) {
        throw new Error('Failed to fetch order');
    }
    return await response.json();
};
