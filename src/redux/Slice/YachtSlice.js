import { createSlice } from '@reduxjs/toolkit';

const yachtSlice = createSlice({
   name: 'auth',
   initialState: {
      count: 0,
      yachts: [],
      yacht: {},
   },
   reducers: {
      setYachts(state, action) {
         state.yachts = action.payload;
      },
      setYacht(state, action) {
         state.yacht = action.payload;
      },
      setCount(state, action) {
         state.count = action.payload;
      },
   },
});

export const { setYachts, setYacht, setCount } = yachtSlice.actions;
export default yachtSlice.reducer;
