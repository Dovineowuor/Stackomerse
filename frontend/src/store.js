// frontend/src/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import productReducer from './features/products/productSlice';
import categoryReducer from './features/category/categorySlice';
const paymentReducer = require('../src/redux/reducers/paymentReducers').default; // Import the payment reducer

export const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    categories: categoryReducer,
    payment: paymentReducer, // Add the payment reducer
  },
});

export default store;
