import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createExpressAccountByUserId } from "../middleware/organizer";

const initialState: any = {
  loading: false,
  error: "",
  accountData: [],
};
const createExpressAcntSlice = createSlice({
  name: "createExpressAccountByUserID",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createExpressAccountByUserId.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createExpressAccountByUserId.fulfilled, (state, action) => {
      state.loading = false;
      state.accountData = action.payload;
    });
    builder.addCase(createExpressAccountByUserId.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default createExpressAcntSlice.reducer;
