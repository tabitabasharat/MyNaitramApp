import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ticketStatus } from "../middleware/event";

const initialState: any = {
  loading: false,
  error: "",
  status: [],
};
const getTicketStatusSlice = createSlice({
  name: "getTicketStatusSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(ticketStatus.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(ticketStatus.fulfilled, (state, action) => {
      state.loading = false;
      state.status = action.payload;
    });
    builder.addCase(ticketStatus.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default getTicketStatusSlice.reducer;
