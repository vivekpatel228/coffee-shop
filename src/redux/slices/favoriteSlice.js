import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  favorite: [],
};

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    getFavoriteCoffee: (state, action) => {
      const isFav = state.favorite.find(
        item => item.title === action.payload.title,
      );
      if (isFav) {
        const fav = state.favorite?.filter(
          item => item.title !== action.payload.title,
        );
        state.favorite = fav;
      } else {
        state.favorite?.push(action.payload);
      }
    },
  },
});

export const {getFavoriteCoffee} = favoriteSlice.actions;
export default favoriteSlice.reducer;
