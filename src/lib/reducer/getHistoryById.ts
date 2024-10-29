import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getHistoryByID } from "../middleware/reward";

const initialState: any = {
  loading: false,
  error: "",
  myWalletHistory: [],
};
const getHistroyByIDSlice = createSlice({
  name: "getHistroyByID",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getHistoryByID.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getHistoryByID.fulfilled, (state, action) => {
      state.loading = false;
      state.myWalletHistory = action.payload;
    });
    builder.addCase(getHistoryByID.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default getHistroyByIDSlice.reducer;