import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getEventsByUID } from "../middleware/organizer";

const initialState:any = {
  loading: false,
  error: "",
  myEvents: [],
};
const getEventsByUIDSlice = createSlice({
  name: "getEventsByUID",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEventsByUID.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getEventsByUID.fulfilled, (state, action) => {
      state.loading = false;
      state.myEvents = action.payload;
    });
    builder.addCase(getEventsByUID.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default getEventsByUIDSlice.reducer;
