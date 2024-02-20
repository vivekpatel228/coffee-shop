import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const isInCart = state.cart.find(
        item => item.title === action.payload.title,
      );
      if (!isInCart) {
        state.cart.push({...action.payload, qnt: 1});
      }
    },
    increaseQnt: (state, action) => {
      state.cart.forEach(item => {
        if (item.title === action.payload) {
          item.qnt += 1;
        }
      });
    },
    decreaseQnt: (state, action) => {
      const coffeeIndex = state.cart.findIndex(
        item => item.title === action.payload,
      );
      if (state.cart[coffeeIndex].qnt <= 1) {
        state.cart.splice(coffeeIndex, 1);
      } else {
        state.cart[coffeeIndex].qnt -= 1;
      }
    },
    clearCart: (state, action) => {
      state.cart = [];
    },
  },
});

export const {addToCart, increaseQnt, decreaseQnt, clearCart} =
  cartSlice.actions;
export default cartSlice.reducer;
