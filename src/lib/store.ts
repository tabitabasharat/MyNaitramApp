import { configureStore, combineReducers, AnyAction } from "@reduxjs/toolkit";
import getAllEvents from "./reducer/getAllEvents";
import getEventById from "./reducer/getEventById";
import addBuyTicketPriceReducer from "./reducer/setBuyTicket";
import getTicket from "./reducer/getTicket";
import sign from "./reducer/sign";
import getAllEventsCount from "./reducer/getAllEventsCount";
import getViewAllEvents from "./reducer/getViewAllEvents";
import getEventByEventID from "./reducer/getEventByEventID";
import getPastEvents from "./reducer/getPastEvents";
import getEventCount from "./reducer/getEventCount";
import getUserLiveEvents from "./reducer/getUserLiveEvents";
import getShowProfile from "./reducer/getShowProfile";
import getUserDetail from "./reducer/getUserDetail";
import getProfileLiveActivity from "./reducer/getProfileLiveActivity";
import getUserSocialProfile from "./reducer/getUserSocialProfile";
import getTicketsByUId from "./reducer/getTicketsByUId";
import getTicketByQR from "./reducer/getTicketByQR";
import getBalanceByID from "./reducer/getBalanceByID";
import getClaimStatus from "./reducer/getClaimStatus";
import getRewardCollectibles from "./reducer/getRewardCollectibles";
import getRewardCollectibleID from "./reducer/getRewardCollectibleID";
import getGraphById from "./reducer/getGraphById";
import getWalletCollectByUID from "./reducer/getWalletCollectByUID";
import getEventsByUID from "./reducer/getEventsByUID";
import getOrgByID from "./reducer/getOrgByID";
import getOrgSocialProfile from "./reducer/getOrgSocialProfile";
import getOrgDetail from "./reducer/getOrgDetail";

const appReducer = combineReducers({
  getAllEvents: getAllEvents,
  getEventById: getEventById,
  getTicketStore: getTicket,
  signIn: sign,
  getEventsCount: getAllEventsCount,
  getViewAllEvents: getViewAllEvents,
  getEventByEventID: getEventByEventID,
  getPastEvents: getPastEvents,
  getEventCount: getEventCount,
  getUserLiveEvents: getUserLiveEvents,
  getShowProfile: getShowProfile,
  getUserDetail: getUserDetail,
  getProfileLiveActivity: getProfileLiveActivity,
  getUserSocialProfile: getUserSocialProfile,
  getTicketsByUId: getTicketsByUId,
  getTicketByQR: getTicketByQR,
  getBalanceByID: getBalanceByID,
  getClaimStatus: getClaimStatus,
  getRewardCollectibles: getRewardCollectibles,
  getRewardCollectibleID: getRewardCollectibleID,
  getGraphById: getGraphById,
  getWalletCollectByUID: getWalletCollectByUID,
  getEventsByUID: getEventsByUID,
  getOrgByID: getOrgByID,
  getOrgSocialProfile: getOrgSocialProfile,
  getOrgDetail: getOrgDetail,
});
const rootReducer = (
  state: ReturnType<typeof appReducer> | undefined,
  action: AnyAction
) => {
  if (action.type === "LOGOUT") {
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
