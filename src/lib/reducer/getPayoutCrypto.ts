import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getPayoutCryptoDetail } from "../middleware/payout";

const initialState:any = {
  loading: false,
  error: "",
  myHistory: [],
};
const getPayoutCryptoDetailSlice = createSlice({
  name: "getPayoutCryptoDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPayoutCryptoDetail .pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPayoutCryptoDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.myHistory = action.payload;
    });
    builder.addCase(getPayoutCryptoDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default getPayoutCryptoDetailSlice.reducer;
