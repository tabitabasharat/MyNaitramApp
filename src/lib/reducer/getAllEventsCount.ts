import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllEventsCount } from "../middleware/event";

const initialState:any = {
  loading: false,
  error: "",
  count: [],
};
const getAllEventsSlice = createSlice({
  name: "getAllEventsCount",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllEventsCount.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllEventsCount.fulfilled, (state, action) => {
      state.loading = false;
      state.allEvents = action.payload;
    });
    builder.addCase(getAllEventsCount.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default getAllEventsSlice.reducer;
