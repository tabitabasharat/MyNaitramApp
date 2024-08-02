import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllEvents } from "../middleware/event";

const initialState:any = {
  loading: false,
  error: "",
  allEvents: [],
};
const getAllEventsSlice = createSlice({
  name: "getAllEvents",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllEvents.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllEvents.fulfilled, (state, action) => {
      state.loading = false;
      state.allEvents = action.payload;
    });
    builder.addCase(getAllEvents.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default getAllEventsSlice.reducer;
