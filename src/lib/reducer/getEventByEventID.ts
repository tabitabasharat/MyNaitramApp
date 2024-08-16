import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getEventByEventId } from "../middleware/event";

const initialState:any = {
  loading: false,
  error: "",
 eventIdEvents: [],
};
const getEventByEventIDSlice = createSlice({
  name: "getEventByEventID",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEventByEventId .pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getEventByEventId .fulfilled, (state, action) => {
      state.loading = false;
      state.eventIdEvents = action.payload;
    });
    builder.addCase(getEventByEventId .rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default  getEventByEventIDSlice.reducer;
