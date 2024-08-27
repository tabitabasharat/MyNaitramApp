import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getTicketByQR } from "../middleware/wallet";

const initialState: any = {
  loading: false,
  error: "",
  myQRTickets: [],
};
const getTicketsByQRSlice = createSlice({
  name: "getTicketsByQR",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTicketByQR.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTicketByQR.fulfilled, (state, action) => {
      state.loading = false;
      state.myQRTickets = action.payload;
    });
    builder.addCase(getTicketByQR.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default getTicketsByQRSlice.reducer;
