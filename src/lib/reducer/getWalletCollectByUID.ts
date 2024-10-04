import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getWalletCollectByUserID } from "../middleware/wallet";

const initialState: any = {
  loading: false,
  error: "",
  myWalletCollectibles: [],
};
const getWalletCollectByUserIDSlice = createSlice({
  name: "getWalletCollectByUserID",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getWalletCollectByUserID.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getWalletCollectByUserID.fulfilled, (state, action) => {
      state.loading = false;
      state.myWalletCollectibles = action.payload;
    });
    builder.addCase(getWalletCollectByUserID.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default getWalletCollectByUserIDSlice.reducer;
