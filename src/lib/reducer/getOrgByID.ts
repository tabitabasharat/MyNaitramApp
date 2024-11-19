import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getOrganizerByID } from "../middleware/organizer";

const initialState: any = {
  loading: false,
  error: "",
  myOrgData: [],
};
const getOrganizerByIDSlice = createSlice({
  name: "getOrganizerByID",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrganizerByID.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOrganizerByID.fulfilled, (state, action) => {
      state.loading = false;
      state.myOrgData = action.payload;
    });
    builder.addCase(getOrganizerByID.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default getOrganizerByIDSlice.reducer;
