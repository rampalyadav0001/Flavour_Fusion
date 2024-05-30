import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createUser,
  loginUser,
  signOutUser,
  checkUser,
  updateUser,
} from './authAPI';

const initialState = {
  loggedInUser: null,
  status: 'idle',
  error: null,
};

export const createUserAsync = createAsyncThunk(
  'auth/createUser',
  async (items) => {
    const response = await createUser(items);

    return response;
  }
);

export const loginUserAsync = createAsyncThunk(
  'auth/loginUser',
  async (item) => {
    const response = await loginUser(item);

    return response;
  }
);
export const verifyTokenAsync = createAsyncThunk(
  'auth/verifyToken',
  async () => {
    const token = sessionStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No token found');
    }
    const response = await checkUser(token);
    return response.data.data;
  }
);
export const updateUserAsync = createAsyncThunk(
  'auth/updateUser',
  async (updateData) => {
   

    const response = await updateUser(updateData);

    return response.data;
  }
);
export const signOutUserAsync = createAsyncThunk(
  'auth/signOutUser',
  async () => {
    const response = await signOutUser();

    return response;
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error;
      })
      .addCase(verifyTokenAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(verifyTokenAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(verifyTokenAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.loggedInUser=null;
        state.error = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(signOutUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signOutUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = null;
      })
      .addCase(signOutUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = null;
        state.error = action.payload;
      });
  },
});

export const selectloggedInUser = (state) => state.auth.loggedInUser;

export const usererror = (state) => state.auth.error;
export default authSlice.reducer;
