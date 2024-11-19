import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getSalesData } from "../middleware/organizer";

const initialState:any = {
  loading: false,
  error: "",
  salesData: [],
};
const getSalesDataSlice = createSlice({
  name: "getSalesDataSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSalesData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSalesData.fulfilled, (state, action) => {
      state.loading = false;
      state.salesData = action.payload;
    });
    builder.addCase(getSalesData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default getSalesDataSlice.reducer;
