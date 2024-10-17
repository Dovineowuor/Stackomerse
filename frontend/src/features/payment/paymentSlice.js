import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    payments: [],
    loading: false,
    error: null,
};

const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        fetchPaymentsStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchPaymentsSuccess(state, action) {
            state.loading = false;
            state.payments = action.payload;
        },
        fetchPaymentsFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        addPayment(state, action) {
            state.payments.push(action.payload);
        },
    },
});

export const {
    fetchPaymentsStart,
    fetchPaymentsSuccess,
    fetchPaymentsFailure,
    addPayment,
} = paymentSlice.actions;

export default paymentSlice.reducer;