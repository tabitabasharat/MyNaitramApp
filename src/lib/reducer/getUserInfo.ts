import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUserInfoByUserId } from "../middleware/organizer";

const initialState: any = {
  loading: false,
  error: "",
  userInfoData: [],
};
const getUserInfoSlice = createSlice({
  name: "getUserInfoByUserID",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserInfoByUserId.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserInfoByUserId.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfoData = action.payload;
    });
    builder.addCase(getUserInfoByUserId.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default getUserInfoSlice.reducer;
