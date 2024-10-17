// src/api/productApi.js
export const fetchProductsAPI = async () => {
    const response = await fetch('http://localhost:5000/api/products');
    return await response.json();
};

export const addProductAPI = async (product) => {
    const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
    });
    return await response.json();
};
