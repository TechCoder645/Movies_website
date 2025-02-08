import { configureStore } from '@reduxjs/toolkit';
import tvReducer from './reducers/tvSlice.jsx';
import peopleReducer from './reducers/peopleSlice.jsx';
import movieReducer from './reducers/movieSlice.jsx';

const store = configureStore({
  reducer: {
    tv: tvReducer,
    people: peopleReducer,
    movie: movieReducer,
  },
});

export default store;
