import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getPhotoRoll } from "../middleware/liveactivity";

const initialState:any = {
  loading: false,
  error: "",
  myData: [],
};
const getPhotoRollChatSlice = createSlice({
  name: "getPhotoRollChat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPhotoRoll.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPhotoRoll.fulfilled, (state, action) => {
      state.loading = false;
      state.myData = action.payload;
    });
    builder.addCase(getPhotoRoll.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error || "something wrong";
    });
  },
});
export default getPhotoRollChatSlice.reducer;
