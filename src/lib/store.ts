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
import getScannerbyEID from "./reducer/getScannerbyEID";
import getSalesData from "./reducer/getSalesData";
import getAllAttendy from "./reducer/getAllAttendy";
import getEventChat from "./reducer/getEventChat";
import getUserNotifications from "./reducer/getUserNotifications";
import getFollowPromoters from "./reducer/getFollowPromoters";
import getOrgNotifications from "./reducer/getOrgNotifications";
import getUserReadNotify from "./reducer/getUserReadNotify";
import getOrgReadNotify from "./reducer/getOrgReadNotify";
import getPayoutHistory from "./reducer/getPayoutHistory";
import getPayoutBankDetail from "./reducer/getPayoutBankDetail";
import getPayoutCrypto from "./reducer/getPayoutCrypto";
import getPaidDetail from "./reducer/getPaidDetail";

import getWalletHistory from "./reducer/getWalletHistory";

import  getOrgLiveSocialProfile  from "./reducer/getOrgLiveSocialProfile";
import getFollowStatus from "./reducer/getFollowStatus";
import getPastEventBox from "./reducer/getPastEventsBox"

const appReducer = combineReducers({
  getAllEvents: getAllEvents,
  getEventById: getEventById,
  getTicket: getTicket,
  signIn: sign,
  getEventsCount: getAllEventsCount,
  getViewAllEvents: getViewAllEvents,
  getEventByEventID: getEventByEventID,
  getPastEvents: getPastEvents,
  getPastEventsBox: getPastEventBox,
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
  getScannerbyEID: getScannerbyEID,
  getSalesData: getSalesData,
  getAllAttend: getAllAttendy,
  getEventChat: getEventChat,
  getUserNotifications: getUserNotifications,
  getFollowPromoters: getFollowPromoters,
  getOrgNotifications: getOrgNotifications,
  getUserReadNotify: getUserReadNotify,
  getOrgReadNotify: getOrgReadNotify,
  getPayoutHistory: getPayoutHistory,
  getPayoutBankDetail: getPayoutBankDetail,
  getPayoutCrypto: getPayoutCrypto,
  getPaidDetail: getPaidDetail,
  getWalletHistory: getWalletHistory,
  getOrgLiveSocialProfile:getOrgLiveSocialProfile,
  getFollowStatus:getFollowStatus,

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
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
