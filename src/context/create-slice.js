import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: '',
  },
  reducers: {
    showNotification: (state, action) => {
      state.message = action.payload;
    },
    clearNotification: (state) => {
      state.message = '';
    },
  },
});

export const { showNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
