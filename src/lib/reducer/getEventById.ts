import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getEventById } from "../middleware/event";

const initialState:any = {
  loading: false,
  error: "",
  specificEvent: [],
};
const getSpecificEventSlice = createSlice({
  name: "getSpecificEvent",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEventById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getEventById.fulfilled, (state, action) => {
      state.loading = false;
      state.specificEvent = action.payload;
    });
    builder.addCase(getEventById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default getSpecificEventSlice.reducer;
