import { configureStore } from "@reduxjs/toolkit";
import getUserInfo from "./reducer/getUserInfo";
import getAllEvents from "./reducer/getAllEvents";
import getEventById from "./reducer/getEventById";
import addBuyTicketPriceReducer from "./reducer/setBuyTicket";
import getTicket from "./reducer/getTicket";
import sign from "./reducer/sign";
export const makeStore = () => {
  return configureStore({
    reducer: {
      profileInfo: getUserInfo,
      getAllEvents: getAllEvents,
      // addBuyTicketPrice: addBuyTicketPriceReducer,
      getEventById:getEventById,
      getTicketStore:getTicket,
      signIn:sign
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
