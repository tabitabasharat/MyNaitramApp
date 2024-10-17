import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getPayoutBankDetail } from "../middleware/payout";

const initialState: any = {
  loading: false,
  error: "",
 myHistory: [],
};
const  getPayoutBankDetailSlice = createSlice({
  name: "getPayoutBankDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPayoutBankDetail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPayoutBankDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.myHistory = action.payload;
    });
    builder.addCase(getPayoutBankDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default getPayoutBankDetailSlice.reducer;
