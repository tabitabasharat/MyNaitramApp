import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getTicketsById } from "../middleware/event";

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
    builder.addCase(getTicketsById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTicketsById.fulfilled, (state, action) => {
      state.loading = false;
      state.specificEvent = action.payload;
    });
    builder.addCase(getTicketsById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default getSpecificEventSlice.reducer;
