import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  info: null,
  loading: false,
  error: null
};

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    loadmovie: (state, action) => {
      state.info = action.payload;
      state.loading = false;
      state.error = null;
    },
    removemovie: (state, action) => {
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
    }
  }
});
    
export const { loadmovie, removemovie, setLoading, setError } = movieSlice.actions;
export default movieSlice.reducer;
