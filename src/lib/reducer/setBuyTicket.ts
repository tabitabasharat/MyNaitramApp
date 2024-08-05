import { createSlice } from "@reduxjs/toolkit";

// const initialState:any = {
//  buyTicket:null
// };

interface CounterState {
    buyTicket: number
  }
  
  // Define the initial state using that type
  const initialState: CounterState = {
    buyTicket: 0,
  }

export const addBuyTicketPrice = createSlice({
  name: "addBuyTicketPrice",
  initialState,
  reducers: {
    setBuyTicket: (state, action:any) => {
      console.log(action.payload,"inside the Editor Reducer");
      state.buyTicket = action.payload;

    },
  },
});

// Action creator
export const { setBuyTicket } = addBuyTicketPrice.actions;

// Reducer
export default addBuyTicketPrice.reducer;
