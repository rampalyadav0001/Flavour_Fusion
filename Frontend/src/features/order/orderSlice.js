import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder, checkout } from './orderAPI';

const initialState = {
  // orders:[],
  status: 'idle',
  currentOrder: null,
  totalOrders: 0,
  PaymentInfo: null,
};

export const createOrderAsync = createAsyncThunk(
  'order/createOrder',
  async (order) => {
    const response = await createOrder(order);

    return response.data.data;
  }
);
export const checkOutAsync = createAsyncThunk(
  'order/checkout',
  async (orderid) => {
    const order={'orderId':orderid}
    console.log(order);
    const response = await checkout(order);

    return response.data;
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';

        state.currentOrder = action.payload;
      })
      .addCase(checkOutAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkOutAsync.fulfilled, (state, action) => {
        state.status = 'idle';

        state.PaymentInfo = action.payload;
      })
      .addCase(checkOutAsync.rejected, (state, action) => {
        state.status = 'idle';

        state.PaymentInfo = null;
      });
  },
});

export const { resetOrder } = orderSlice.actions;

export const selectCurrentOrder = (state) => state.order.currentOrder;
// export const selectOrders = (state) => state.order.order;
// export const selectTotalOrders = (state) => state.order.totalOrders;

export default orderSlice.reducer;
