import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getOrgReadNotifications } from "../middleware/notification";

const initialState:any = {
  loading: false,
  error: "",
  myNotifications: [],
};
const getOrgReadNotificationsSlice = createSlice({
  name: "getOrgReadNotifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrgReadNotifications .pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOrgReadNotifications.fulfilled, (state, action) => {
      state.loading = false;
      state.myNotifications = action.payload;
    });
    builder.addCase(getOrgReadNotifications .rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default getOrgReadNotificationsSlice.reducer;
