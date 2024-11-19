import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUserNotifications } from "../middleware/notification";

const initialState:any = {
  loading: false,
  error: "",
  myNotifications: [],
};
const getUserNotificationsSlice = createSlice({
  name: "getUserNotifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserNotifications .pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserNotifications.fulfilled, (state, action) => {
      state.loading = false;
      state.myNotifications = action.payload;
    });
    builder.addCase(getUserNotifications .rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default getUserNotificationsSlice.reducer;
