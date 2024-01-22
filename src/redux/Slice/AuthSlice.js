import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
   name: 'auth',
   initialState: {
      isLoggedIn: false,
      userData: {
         id: '',
         email: '',
         name: '',
         phone: '',
         avatar: '',
      },
   },
   reducers: {
      setIsLoggin(state, action) {
         state.isLoggedIn = action.payload;
      },
      setUserData(state, action) {
         state.userData = action.payload;
      },
      logout(state) {
         state.isLoggedIn = false;
      },
   },
});

export const { setIsLoggin, setUserData, logout } = authSlice.actions;
export default authSlice.reducer;
