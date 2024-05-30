import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCartItem, addItem, deleteItem, resetCart } from './cartAPI';

const initialState = {
  items: [],
  bill: 0,
  status: 'idle',
  cart_id: '',
};

// Async actions
export const fetchCartItemAsync = createAsyncThunk(
  'cart/fetchCartItem',
  async () => {
    const response = await fetchCartItem();
    return response.data.data;
  }
);

export const addItemAsync = createAsyncThunk('cart/addItem', async (item) => {
  const newItem = { Order_id: item._id, quantity: 1 };
  const response = await addItem(newItem);
  return response.data.data;
});

export const updateItemAsync = createAsyncThunk(
  'cart/updateItem',
  async (item) => {
    const newItem = { Order_id:item._id, quantity: item.quantity };
   const response= await addItem(newItem);
  //  console.log(response.data.data.Order_Item);
    return response.data.data.Order_Item;
  }
);

export const deleteItemAsync = createAsyncThunk(
  'cart/deleteItem',
  async (item) => {
    await deleteItem({ food_id: item.order });
    return item.order;
  }
);

export const resetCartAsync = createAsyncThunk('cart/resetCart', async () => {
  await resetCart();
  return { response: 'ok' };
});

// Slice
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItemAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCartItemAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload.Order_Item;
        state.bill = action.payload.Bill;
        state.cart_id = action.payload._id;
      })
      .addCase(fetchCartItemAsync.rejected, (state) => {
        state.status = 'idle';
        state.items = [];
        state.bill = 0;
      })
      .addCase(addItemAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addItemAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
      })
      .addCase(updateItemAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateItemAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items=action.payload;
      })
      .addCase(deleteItemAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteItemAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = state.items.filter(
          (item) => item.order !== action.payload
        );
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetCartAsync.fulfilled, (state) => {
        state.status = 'idle';
        state.items = [];
        state.bill = 0;
        state.cart_id = '';
      });
  },
});

// Selectors
export const cartItem = (state) => state.cart.items;
export const Bill = (state) => state.cart.bill;
export const CartId = (state) => state.cart.cart_id;

export default cartSlice.reducer;
