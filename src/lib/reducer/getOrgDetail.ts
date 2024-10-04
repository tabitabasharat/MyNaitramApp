import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getOrganizerDetail } from "../middleware/organizer";

const initialState:any = {
  loading: false,
  error: "",
 orgDetail: [],
};
const getOrganizerDetailSlice = createSlice({
  name: "getOrganizerDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrganizerDetail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOrganizerDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.orgDetail = action.payload;
    });
    builder.addCase(getOrganizerDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default getOrganizerDetailSlice.reducer;
