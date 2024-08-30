import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getOrganizerSocialProfile } from "../middleware/organizer";

const initialState: any = {
  loading: false,
  error: "",
  mySocialData: [],
};
const getOrganizerSocialProfileSlice = createSlice({
  name: "getOrganizerSocialProfile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrganizerSocialProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOrganizerSocialProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.mySocialData = action.payload;
    });
    builder.addCase(getOrganizerSocialProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default getOrganizerSocialProfileSlice.reducer;
