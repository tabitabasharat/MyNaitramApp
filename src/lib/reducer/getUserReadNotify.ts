import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {getUserReadNotifications } from "../middleware/notification";

const initialState:any = {
  loading: false,
  error: "",
  myNotifications: [],
};
const getUserReadNotificationsSlice = createSlice({
  name: "getUserReadNotifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserReadNotifications .pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserReadNotifications.fulfilled, (state, action) => {
      state.loading = false;
      state.myNotifications = action.payload;
    });
    builder.addCase(getUserReadNotifications .rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default getUserReadNotificationsSlice.reducer;
