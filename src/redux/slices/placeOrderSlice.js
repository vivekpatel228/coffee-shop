import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  order: [],
};

const placeOrderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    getPlaceOrder: (state, action) => {
      state.order?.push({
        orders: [...action.payload.data],
        date: Date.now(),
        totalAmount: action.payload.totalAmount,
      });
    },
    clearHistory: (state, action) => {
      state.order = [];
    },
  },
});

export const {getPlaceOrder, clearHistory} = placeOrderSlice.actions;
export default placeOrderSlice.reducer;
