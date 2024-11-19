import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getOrgNotifications } from "../middleware/notification";

const initialState:any = {
  loading: false,
  error: "",
  myNotifications: [],
};
const getOrgNotificationsSlice = createSlice({
  name: "getOrgNotifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrgNotifications .pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOrgNotifications.fulfilled, (state, action) => {
      state.loading = false;
      state.myNotifications = action.payload;
    });
    builder.addCase(getOrgNotifications .rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default getOrgNotificationsSlice.reducer;
