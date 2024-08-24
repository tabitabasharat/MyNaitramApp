import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUserSocialProfile } from "../middleware/profile";

const initialState: any = {
  loading: false,
  error: "",
  myProfile: [],
};
const getSocialProfileSlice = createSlice({
  name: "getSocialProfile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserSocialProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserSocialProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.myProfile = action.payload;
    });
    builder.addCase(getUserSocialProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default getSocialProfileSlice.reducer;
