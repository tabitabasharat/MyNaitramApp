import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getEventCount } from "../middleware/event";

const initialState:any = {
  loading: false,
  error: "",
 myEventsCount: [],
};
const getEventsCountSlice = createSlice({
  name: "getEventsCount",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEventCount.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getEventCount.fulfilled, (state, action) => {
      state.loading = false;
      state.myEventsCount = action.payload;
    });
    builder.addCase(getEventCount.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default  getEventsCountSlice.reducer;
