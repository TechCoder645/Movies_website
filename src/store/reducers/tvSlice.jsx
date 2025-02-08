import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  info: null,
  loading: false,
  error: null,
};

const tvSlice = createSlice({
  name: 'tv',
  initialState,
  reducers: {
    loadTvShow: (state, action) => {
      state.info = action.payload;
      state.loading = false;
      state.error = null;
    },
    removeTvShow: (state) => {
      state.info = null;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { loadTvShow, removeTvShow, setLoading, setError } = tvSlice.actions;

export default tvSlice.reducer;