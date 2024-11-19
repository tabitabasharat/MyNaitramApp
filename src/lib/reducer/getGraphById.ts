import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getgraphByID } from "../middleware/wallet";

const initialState: any = {
  loading: false,
  error: "",
  myGraphHistory: [],
};
const getgraphByIDSlice = createSlice({
  name: "getgraphByID",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getgraphByID.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getgraphByID.fulfilled, (state, action) => {
      state.loading = false;
      state.myGraphHistory = action.payload;
    });
    builder.addCase(getgraphByID.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default getgraphByIDSlice.reducer;
