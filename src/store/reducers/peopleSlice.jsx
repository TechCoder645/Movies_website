import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  info: null,
  loading: false,
  error: null
};

const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    loadpeople: (state, action) => {
      state.info = action.payload;
      state.loading = false;
      state.error = null;
    },
    removepeople: (state) => {
      state.info = null;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});
    
export const { loadpeople, removepeople, setLoading, setError } = peopleSlice.actions;
export default peopleSlice.reducer;