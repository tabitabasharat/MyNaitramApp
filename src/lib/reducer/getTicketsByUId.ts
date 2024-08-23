import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getTicketsByID } from "../middleware/wallet";

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
    builder.addCase(getTicketsByID.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTicketsByID.fulfilled, (state, action) => {
      state.loading = false;
      state.myTickets = action.payload;
    });
    builder.addCase(getTicketsByID.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default getTicketsByIDSlice.reducer;
