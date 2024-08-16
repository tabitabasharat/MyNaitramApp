import { configureStore,  combineReducers, AnyAction} from "@reduxjs/toolkit";
import getUserInfo from "./reducer/getUserInfo";
import getAllEvents from "./reducer/getAllEvents";
import getEventById from "./reducer/getEventById";
import addBuyTicketPriceReducer from "./reducer/setBuyTicket";
import getTicket from "./reducer/getTicket";
import sign from "./reducer/sign";
import getAllEventsCount from "./reducer/getAllEventsCount";
import getViewAllEvents from "./reducer/getViewAllEvents";
import getEventByEventID from "./reducer/getEventByEventID";
import getPastEvents from "./reducer/getPastEvents";

const appReducer = combineReducers({
  profileInfo: getUserInfo,
  getAllEvents: getAllEvents,
  getEventById: getEventById,
  getTicketStore: getTicket,
  signIn: sign,
  getEventsCount:getAllEventsCount,
  getViewAllEvents:getViewAllEvents,
  getEventByEventID: getEventByEventID,
  getPastEvents:getPastEvents,

});
const rootReducer = (state: ReturnType<typeof appReducer> | undefined, action: AnyAction) => {
  if (action.type === 'LOGOUT') {
    state = undefined;
  }
  return appReducer(state, action);
};

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};
// export const makeStore = () => {
//   return configureStore({
//     reducer: {
//       profileInfo: getUserInfo,
//       getAllEvents: getAllEvents,
//       // addBuyTicketPrice: addBuyTicketPriceReducer,
//       getEventById:getEventById,
//       getTicketStore:getTicket,
//       signIn:sign
//     },
//   });
// };


// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
