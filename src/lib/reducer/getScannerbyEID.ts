import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getScannerByEventID } from "../middleware/scanner";

const initialState:any = {
  loading: false,
  error: "",
  myScanners: [],
};
const getScannerByEventIDSlice = createSlice({
  name: "getScannerByEventID",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getScannerByEventID.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getScannerByEventID.fulfilled, (state, action) => {
      state.loading = false;
      state. myScanners = action.payload;
    });
    builder.addCase(getScannerByEventID.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default getScannerByEventIDSlice.reducer;
