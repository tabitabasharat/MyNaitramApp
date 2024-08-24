import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getLiveEventById } from "../middleware/event";

const initialState:any = {
  loading: false,
  error: "",
  myLiveEvents: [],
};
const getLiveEventSlice = createSlice({
  name: "getLiveEvent",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLiveEventById .pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getLiveEventById .fulfilled, (state, action) => {
      state.loading = false;
      state.myLiveEvents = action.payload;
    });
    builder.addCase(getLiveEventById .rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default getLiveEventSlice.reducer;
