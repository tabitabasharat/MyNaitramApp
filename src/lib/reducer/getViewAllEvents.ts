import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getViewAllEvent } from "../middleware/event";

const initialState:any = {
  loading: false,
  error: "",
  ViewallEvents: [],
};
const getViewAllEventsSlice = createSlice({
  name: "getViewAllEvents",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getViewAllEvent.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getViewAllEvent.fulfilled, (state, action) => {
      state.loading = false;
      state.ViewallEvents = action.payload;
    });
    builder.addCase(getViewAllEvent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default getViewAllEventsSlice .reducer;
