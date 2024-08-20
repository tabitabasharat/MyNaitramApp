import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { showLiveActivity } from "../middleware/profile";
import LiveActivity from "@/components/live-activity-page/LiveActivity";

const initialState:any = {
  loading: false,
  error: "",
  LiveActivity: [],
};
const getliveActivitySlice = createSlice({
  name: "getliveActivity",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(showLiveActivity.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(showLiveActivity.fulfilled, (state, action) => {
      state.loading = false;
      state.LiveActivity = action.payload;
    });
    builder.addCase(showLiveActivity.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default  getliveActivitySlice.reducer;
