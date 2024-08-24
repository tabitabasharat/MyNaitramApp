import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { showProfile } from "../middleware/profile";

const initialState:any = {
  loading: false,
  error: "",
  myProfile: [],
};
const getProfileSlice = createSlice({
  name: "getProfile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(showProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(showProfile.fulfilled, (state, action) => {
      state.loading = false;
      state. myProfile = action.payload;
    });
    builder.addCase(showProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default getProfileSlice.reducer;
