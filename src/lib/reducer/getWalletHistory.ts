import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getwallethistory } from "../middleware/wallet";

const initialState: any = {
  loading: false,
  error: "",
  myWalletHistory: [],
};
const getWalletHistorySlice = createSlice({
  name: "getWalletHistory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getwallethistory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getwallethistory.fulfilled, (state, action) => {
      state.loading = false;
      state.myWalletHistory = action.payload;
    });
    builder.addCase(getwallethistory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default getWalletHistorySlice.reducer;
