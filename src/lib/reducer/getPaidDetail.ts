import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getPaidDetail } from "../middleware/payout";

const initialState: any = {
  loading: false,
  error: "",
  paidData: [],
};
const getPaidDetailSlice = createSlice({
  name: "getPaidDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPaidDetail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPaidDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.paidData = action.payload;
    });
    builder.addCase(getPaidDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default getPaidDetailSlice.reducer;
