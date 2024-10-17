import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getRewardCollectibles } from "../middleware/reward";

const initialState: any = {
  loading: false,
  error: "",
  myCollectibles: [],
};
const getCollectiblesSlice = createSlice({
  name: "getCollectibles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRewardCollectibles.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getRewardCollectibles.fulfilled, (state, action) => {
      state.loading = false;
      state.myCollectibles = action.payload;
    });
    builder.addCase(getRewardCollectibles.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default getCollectiblesSlice.reducer;
