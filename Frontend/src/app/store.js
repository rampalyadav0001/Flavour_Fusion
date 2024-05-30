import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import productReducer from '../features/Menu-list/MenuSlice';
import cartReducer from '../features/cart/cartSlice';
import authReducer from '../features/auth/authSlice';
import orderReducer from '../features/order/orderSlice';
import userReducer from '../features/user/userSlice';

// Combine all reducers
const rootReducer = combineReducers({
  product: productReducer,
  cart: cartReducer,
  auth: authReducer,
  order: orderReducer,
  user: userReducer,
});

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  // You can specify which parts of the state you want to persist
  whitelist: ['cart','auth', 'order', 'user'], // Add more as needed
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with the persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
});

// Create a persistor
export const persistor = persistStore(store);
