import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  hotCoffee: [],
  icedCoffee: [],
};

export const getHotCoffee = createAsyncThunk('hotCoffee', async () => {
  const res = await fetch('https://api.sampleapis.com/coffee/hot');
  const data = await res.json();
  return data;
});

export const getIcedCoffee = createAsyncThunk('icedCoffee', async () => {
  const res = await fetch('https://api.sampleapis.com/coffee/iced');
  const data = await res.json();
  return data;
});

export const hotCoffeeSlice = createSlice({
  name: 'hot coffees',
  initialState,
  extraReducers: builder => {
    builder.addCase(getHotCoffee.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getHotCoffee.fulfilled, (state, action) => {
      if (action.payload) {
        state.hotCoffee = action.payload;
      }
      state.isLoading = false;
    });
    builder.addCase(getHotCoffee.rejected, (state, action) => {
      console.log('Hot Coffee data error', action.payload);
      state.isLoading = false;
    });
  },
});

export const icedCoffeeSlice = createSlice({
  name: 'iced coffees',
  initialState,
  extraReducers: builder => {
    builder.addCase(getIcedCoffee.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getIcedCoffee.fulfilled, (state, action) => {
      if (action.payload) {
        state.icedCoffee = action.payload;
      }
      state.isLoading = false;
    });
    builder.addCase(getIcedCoffee.rejected, (state, action) => {
      console.log('Iced Coffee data error', action.payload);
      state.isLoading = false;
    });
  },
});
