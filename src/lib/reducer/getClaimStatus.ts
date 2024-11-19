import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getClaimStatus } from "../middleware/reward";

const initialState:any = {
  loading: false,
  error: "",
myClaim: [],
};
const getClaimStatusSlice = createSlice({
  name: "getClaimstatus",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getClaimStatus .pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getClaimStatus .fulfilled, (state, action) => {
      state.loading = false;
      state.myClaim = action.payload;
    });
    builder.addCase(getClaimStatus .rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default  getClaimStatusSlice.reducer;
