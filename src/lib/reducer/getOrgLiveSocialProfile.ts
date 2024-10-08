import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getOrganizerLiveSocialProfile } from "../middleware/organizer";

const initialState: any = {
  loading: false,
  error: "",
  mySocialData: [],
};
const getOrgLiveSocialProfileSlice = createSlice({
  name: "getOrganizerliveSocialProfile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrganizerLiveSocialProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOrganizerLiveSocialProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.mySocialData = action.payload;
    });
    builder.addCase(getOrganizerLiveSocialProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default getOrgLiveSocialProfileSlice.reducer;
