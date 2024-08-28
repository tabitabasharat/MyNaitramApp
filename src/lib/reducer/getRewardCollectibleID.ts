import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getRewardCollectibleByID } from "../middleware/reward";

const initialState: any = {
  loading: false,
  error: "",
  mySpecificCollectible: [],
};
const getRewardCollectibleByIDSlice = createSlice({
  name: "getRewardCollectibleByID",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRewardCollectibleByID.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getRewardCollectibleByID.fulfilled, (state, action) => {
      state.loading = false;
      state.mySpecificCollectible = action.payload;
    });
    builder.addCase(getRewardCollectibleByID.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default getRewardCollectibleByIDSlice.reducer;
