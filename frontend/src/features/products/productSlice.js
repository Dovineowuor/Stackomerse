// src/features/products/productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProductsAPI, addProductAPI } from '../../api/productApi';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await fetchProductsAPI();
    return response.data;
});

export const addProduct = createAsyncThunk('products/addProduct', async (product) => {
    const response = await addProductAPI(product);
    return response.data;
});

const productSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default productSlice.reducer;
