import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getViewPastEventsBox } from "../middleware/event";

const initialState:any = {
  loading: false,
  error: "",
  ViewPastEvents: [],
};
const getViewPastEventsSliceBox = createSlice({
  name: "getViewPastEventsSliceBox",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getViewPastEventsBox.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getViewPastEventsBox.fulfilled, (state, action) => {
      state.loading = false;
      state.ViewPastEvents = action.payload;
    });
    builder.addCase(getViewPastEventsBox.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default getViewPastEventsSliceBox.reducer;
