import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getPayoutHistory } from "../middleware/payout";

const initialState:any = {
  loading: false,
  error: "",
  myHistory: [],
};
const getPayoutHistorySlice = createSlice({
  name: "getPayoutHistory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPayoutHistory .pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPayoutHistory.fulfilled, (state, action) => {
      state.loading = false;
      state.myHistory = action.payload;
    });
    builder.addCase(getPayoutHistory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default  getPayoutHistorySlice.reducer;
