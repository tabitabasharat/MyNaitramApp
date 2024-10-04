import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getBalanceByID } from "../middleware/wallet";

const initialState:any = {
  loading: false,
  error: "",
myBalance: [],
};
const getBalanceByIDSlice = createSlice({
  name: "getBalanceByID",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBalanceByID .pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getBalanceByID .fulfilled, (state, action) => {
      state.loading = false;
      state.myBalance = action.payload;
    });
    builder.addCase(getBalanceByID .rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default  getBalanceByIDSlice.reducer;
