import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getTicketsById } from "../middleware/wallet";

const initialState: any = {
  loading: false,
  error: "",
  myTickets: [],
};
const getTicketsByIDSlice = createSlice({
  name: "getTicketsByID",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTicketsById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTicketsById.fulfilled, (state, action) => {
      state.loading = false;
      state.myTickets = action.payload;
    });
    builder.addCase(getTicketsById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default getTicketsByIDSlice.reducer;
