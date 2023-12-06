import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userRole: null,
  token: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserRole: (state, action) => {
      const { userRole, token } = action.payload;
      state.userRole = userRole;
      state.token = token;
    },
  },
});

export const { setUserRole } = userSlice.actions;
export const selectUserRole = (state) => state.user;

export default userSlice.reducer;
