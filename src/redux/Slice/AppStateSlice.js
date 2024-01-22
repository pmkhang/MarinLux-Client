import { createSlice } from '@reduxjs/toolkit';

const appStateSlice = createSlice({
   name: 'appState',
   initialState: {
      showMenuUser: false,
      categories: [],
      locations: [],
      booking: {},
      booking_id: '',
      bookingsByUser: [],
   },
   reducers: {
      setShowMenuUser(state, action) {
         state.showMenuUser = action.payload;
      },
      setCategories(state, action) {
         state.categories = action.payload;
      },
      setLocations(state, action) {
         state.locations = action.payload;
      },
      setBooking(state, action) {
         state.booking = action.payload;
      },
      setBookingId(state, action) {
         state.booking_id = action.payload;
      },
      setBookingByUser(state, action) {
         state.bookingsByUser = action.payload;
      },
   },
});

export const { setShowMenuUser, setCategories, setLocations, setBooking, setBookingId, setBookingByUser } =
   appStateSlice.actions;
export default appStateSlice.reducer;
