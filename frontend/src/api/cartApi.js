// Fetch user cart
export const fetchCartAPI = async () => {
    const response = await fetch('http://localhost:5000/api/cart/', {
        method: 'GET',
    });
    if (!response.ok) {
        throw new Error('Failed to fetch cart');
    }
    return await response.json();
};

// Update cart item by ID
export const updateCartItemAPI = async (cartItemId, updatedItemData) => {
    const response = await fetch(`http://localhost:5000/api/cart/${cartItemId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItemData),
    });
    if (!response.ok) {
        throw new Error('Failed to update cart item');
    }
    return await response.json();
};
