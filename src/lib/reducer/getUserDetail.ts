import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUserByID } from "../middleware/profile";

const initialState:any = {
  loading: false,
  error: "",
  userProfile: [],
};
const getProfileInfoSlice = createSlice({
  name: "getProfileInfo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserByID.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserByID.fulfilled, (state, action) => {
      state.loading = false;
      state.userProfile = action.payload;
    });
    builder.addCase(getUserByID.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default getProfileInfoSlice.reducer;
