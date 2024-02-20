import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {hotCoffeeSlice, icedCoffeeSlice} from '../slices/coffeeSlice';
import favoriteReducer from '../slices/favoriteSlice';
import storage from '@react-native-async-storage/async-storage';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import cartReducer from '../slices/cartSlice';
import placeOrderReducer from '../slices/placeOrderSlice';

const persistConfig = {
  key: 'favorite',
  storage,
};

const orderpersistConfig = {
  key: 'order',
  storage,
};

const favoritePersistReducer = persistReducer(persistConfig, favoriteReducer);
const cartPersistReducer = persistReducer(persistConfig, cartReducer);
const placeOrderPersistReducer = persistReducer(
  orderpersistConfig,
  placeOrderReducer,
);

const rootReducer = combineReducers({
  hotCoffee: hotCoffeeSlice.reducer,
  icedCoffee: icedCoffeeSlice.reducer,
  favorite: favoritePersistReducer,
  cart: cartPersistReducer,
  order: placeOrderPersistReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
