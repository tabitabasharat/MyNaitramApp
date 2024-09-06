import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getEventAttend } from "../middleware/event";

const initialState:any = {
  loading: false,
  error: "",
  attend: [],
};
const getAllEventsSlice = createSlice({
  name: "getAllEvents",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEventAttend.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getEventAttend.fulfilled, (state, action) => {
      state.loading = false;
      state.attend = action.payload;
    });
    builder.addCase(getEventAttend.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default getAllEventsSlice.reducer;
