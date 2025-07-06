import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
    },
    updateFavorites(state, action) {
      if (state.user) {
        state.user.favorite_locations = action.payload;
      }
    },
  },
});

export const { setUser, clearUser, updateFavorites } = userSlice.actions;
export default userSlice.reducer;
