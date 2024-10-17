import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getFollowingPromoters } from "../middleware/liveactivity";

const initialState:any = {
  loading: false,
  error: "",
  myFollowers: [],
};
const getFollowersSlice = createSlice({
  name: "getFollowers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase( getFollowingPromoters.pending, (state) => {
      state.loading = true;
    });
    builder.addCase( getFollowingPromoters.fulfilled, (state, action) => {
      state.loading = false;
      state.myFollowers = action.payload;
    });
    builder.addCase( getFollowingPromoters.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default getFollowersSlice.reducer;
