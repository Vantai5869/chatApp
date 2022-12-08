import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getData } from '../../helper';

const initialState = {
  data: null,
  token:null,
  loading: true,
  error: false,
};

export const getAuth = createAsyncThunk(
    'getAuth',
    async () => {
      return await getData();
    },
  );

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    savaAuth: (state, action)=>{
      state.data= action.payload.data;
      if(action.payload?.token)
      state.token = action.payload.token;
    },
   
    clearAuth: () =>({...initialState, loading:false})
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAuth.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getAuth.fulfilled, (state, action) => {
        if(action.payload!=null){
          state.data = action.payload.data;
          state.token = action.payload.token;
        }
        state.loading = false;
      })
      .addCase(getAuth.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export const {savaAuth, clearAuth}= authSlice.actions
export default authSlice.reducer;
