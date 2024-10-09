import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FollowPromoterStatus } from "../middleware/event";

const initialState:any = {
  loading: false,
  error: "",
myStatus: [],
};
const getFollowPromoterStatusSlice = createSlice({
  name: "getFollowPromoterStatus",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(FollowPromoterStatus.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(FollowPromoterStatus.fulfilled, (state, action) => {
      state.loading = false;
      state.myStatus = action.payload;
    });
    builder.addCase(FollowPromoterStatus.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default getFollowPromoterStatusSlice.reducer;
