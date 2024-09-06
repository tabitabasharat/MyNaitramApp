import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getChat } from "../middleware/liveactivity";

const initialState: any = {
  loading: false,
  error: "",
  myEventChat: [],
};
const getEventChatSlice = createSlice({
  name: "getEventChat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getChat.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getChat.fulfilled, (state, action) => {
      state.loading = false;
      state.myEventChat = action.payload;
    });
    builder.addCase(getChat.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default getEventChatSlice.reducer;
