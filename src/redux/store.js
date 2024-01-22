// store.js

import { configureStore } from '@reduxjs/toolkit';
import authSlice from './Slice/AuthSlice';
import appStateSlice from './Slice/AppStateSlice';
import YachtSlice from './Slice/YachtSlice';

const store = configureStore({
   reducer: {
      auth: authSlice,
      appState: appStateSlice,
      yachts: YachtSlice,
   },
});

export default store;
