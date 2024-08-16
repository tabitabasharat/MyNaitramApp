import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getViewPastEvents } from "../middleware/event";

const initialState:any = {
  loading: false,
  error: "",
  ViewPastEvents: [],
};
const getViewPastEventsSlice = createSlice({
  name: "getViewPastEvents",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getViewPastEvents.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getViewPastEvents.fulfilled, (state, action) => {
      state.loading = false;
      state.ViewPastEvents = action.payload;
    });
    builder.addCase(getViewPastEvents.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default getViewPastEventsSlice .reducer;
