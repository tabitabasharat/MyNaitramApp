import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getOrganizerPastEvents } from "../middleware/event_analytics";

const initialState: any = {
  loading: false,
  error: "",
  organizerPastEvents: [],
};
const getOrganizerPastEventsSlice = createSlice({
  name: "getOrganizerPastEvents",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrganizerPastEvents.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOrganizerPastEvents.fulfilled, (state, action) => {
      state.loading = false;
      state.organizerPastEvents = action.payload;
    });
    builder.addCase(getOrganizerPastEvents.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default getOrganizerPastEventsSlice.reducer;
