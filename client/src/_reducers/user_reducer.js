/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios';
import {
  AUTH_USER,
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER,
} from '../_actions/types';

const initialState = {
  data: null,
  error: null,
  loading: false,
};

export const auth = createAsyncThunk('auth', async (data, thunkAPI) => {
  try {
    const request = await Axios.get(`${process.env.REACT_APP_SERVER_URL}`);

    data = request.response;
    return {
      type: AUTH_USER,
      payload: data,
    };
  } catch (error) {
    console.log('errorMessage ====', error);
    const errorMessage =
      (error.response && error.response.data && error.response.data.error) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const registerUser = createAsyncThunk(
  'registerUser',
  async (data, thunkAPI) => {
    try {
      const request = await Axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/register`,
        data
      );

      data = request.response;
      return {
        type: REGISTER_USER,
        payload: data,
      };
    } catch (error) {
      console.log('errorMessage ====', error);
      const errorMessage =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const loginUser = createAsyncThunk(
  'loginUser',
  async (data, thunkAPI) => {
    try {
      const request = await Axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/login`,
        data
      );

      data = request.response;
      return {
        type: LOGIN_USER,
        payload: data,
      };
    } catch (error) {
      console.log('errorMessage ====', error);
      const errorMessage =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'logoutUser',
  async (data, thunkAPI) => {
    try {
      const request = await Axios.get(
        `${process.env.REACT_APP_SERVER_URL}/logout`
      );

      data = request.response;
      return {
        type: LOGOUT_USER,
        payload: data,
      };
    } catch (error) {
      console.log('errorMessage ====', error);
      const errorMessage =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

const userReducer = createSlice({
  name: 'user_reducer',
  initialState,
  reducers: {
    userStateReset: (state) => {
      state.error = null;
      state.data = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(auth.pending, (state) => {
        state.loading = true;
      })
      .addCase(auth.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload?.partner;
        state.error = null;
      })
      .addCase(auth.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
      });
  },
});
export const { userStateReset } = userReducer.actions;

export default userReducer.reducer;
