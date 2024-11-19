import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getTicketsByID } from "../middleware/wallet";
import {getAllTickets} from "../middleware/wallet"

const initialState: any = {
  loading: false,
  error: "",
  myTickets: [],
};
const getTicketsByIDSlice = createSlice({
  name: "getTickets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllTickets.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllTickets.fulfilled, (state, action) => {
      state.loading = false;
      state.myTickets = action.payload;
    });
    builder.addCase(getAllTickets.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default getTicketsByIDSlice.reducer;
