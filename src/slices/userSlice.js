import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
  isLoading: false,
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
    },
    clearUser(state) {
      state.data = initialState.data;
      state.isLoading = initialState.isLoading;
      state.error = initialState.error;
    },
    updateFavorites(state, action) {
      if (state.data) {
        state.data.favorite_locations = action.payload;
      }
    },
  },
});

export const { setUser, clearUser, updateFavorites } = userSlice.actions;
export default userSlice.reducer;
