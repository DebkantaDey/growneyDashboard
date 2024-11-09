import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './create-slice';

const store = configureStore({
  reducer: {
    notification: notificationReducer,
  },
});

export default store;
