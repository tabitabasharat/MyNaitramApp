import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getOrganizerProfileFutures } from "../middleware/event_analytics";

const initialState: any = {
  loading: false,
  error: "",
  allOrganizerProfileFutures: [],
};
const getOrganizerProfileFuturesSlice = createSlice({
  name: "getOrganizerProfileFutures",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrganizerProfileFutures.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOrganizerProfileFutures.fulfilled, (state, action) => {
      state.loading = false;
      state.ViewPastEvents = action.payload;
    });
    builder.addCase(getOrganizerProfileFutures.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default getOrganizerProfileFuturesSlice.reducer;
