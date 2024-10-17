import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../apiInterceptor";
import { API_URL } from "../client";

export const getUserNotifications = createAsyncThunk(
    "getUserNotifications",
    async (data: any) => {
      try {
        console.log("inside get User Notifications");
        const res = await api.get(`${API_URL}/help/getNotifications/${data}`);
        console.log("inside get User Notifications", res);
        // localStorage.setItem("token", res?.data?.token);
        return {
          status: res?.status,
          data: res?.data?.data,
        };
      } catch (error: any) {
        return {
          message: error?.response?.data?.error,
          status: error?.response?.status,
        };
      }
    }
  );
  
  export const getOrgNotifications = createAsyncThunk(
    "getOrgNotifications",
    async (data: any) => {
      try {
        console.log("inside get Org Notifications");
        const res = await api.get(`${API_URL}/help/getOrganizerNotifications/${data}`);
        console.log("inside get Org Notifications", res);
        // localStorage.setItem("token", res?.data?.token);
        return {
          status: res?.status,
          data: res?.data?.data,
        };
      } catch (error: any) {
        return {
          message: error?.response?.data?.error,
          status: error?.response?.status,
        };
      }
    }
  );


  export const getUserReadNotifications = createAsyncThunk(
    "getUserReadNotifications",
    async (data: any) => {
      try {
        console.log("inside get User Read Notifications");
        const res = await api.get(`${API_URL}/help/markNotificationAsRead/${data}`);
        console.log("inside get User Read Notifications", res);
        // localStorage.setItem("token", res?.data?.token);
        return {
          status: res?.status,
          data: res?.data?.data,
        };
      } catch (error: any) {
        return {
          message: error?.response?.data?.error,
          status: error?.response?.status,
        };
      }
    }
  );
  
  export const getOrgReadNotifications = createAsyncThunk(
    "getOrgReadNotifications",
    async (data: any) => {
      try {
        console.log("inside get Org Read Notifications");
        const res = await api.get(`${API_URL}/help/markOrganizerNotificationAsRead/${data}`);
        console.log("inside get Org Read Notifications", res);
        // localStorage.setItem("token", res?.data?.token);
        return {
          status: res?.status,
          data: res?.data?.data,
        };
      } catch (error: any) {
        return {
          message: error?.response?.data?.error,
          status: error?.response?.status,
        };
      }
    }
  );
  
  export const notificationStatus = createAsyncThunk(
    "notificationStatus",
    async (data: any) => {
      try {
        console.log("inside the user read no");
        const res = await api.post(`${API_URL}/help/markNotificationAsRead`, data);
        console.log("inside the user read no", res);
  
        // localStorage.setItem("token", res?.data?.token);
        return {
          status: res?.status,
          data: res?.data?.data,
          token: res?.data?.token,
        };
      } catch (error: any) {
        return {
          message: error?.response?.data?.error,
          status: error?.response?.status,
        };
      }
    }
  );


  export const notificationStatusOrg = createAsyncThunk(
    "notificationStatusOrg",
    async (data: any) => {
      try {
        console.log("inside the org read no");
        const res = await api.post(`${API_URL}/help/getAndMarkOrganizerNotification`, data);
        console.log("inside the org read no", res);
  
        // localStorage.setItem("token", res?.data?.token);
        return {
          status: res?.status,
          data: res?.data?.data,
          token: res?.data?.token,
        };
      } catch (error: any) {
        return {
          message: error?.response?.data?.error,
          status: error?.response?.status,
        };
      }
    }
  );


  export const UserNotificationReadAll = createAsyncThunk(
    "UserNotificationReadAll",
    async (data: any) => {
      try {
        console.log("inside the user read all");
        const res = await api.post(`${API_URL}/help/markAllUserNotificationsRead`, data);
        console.log("inside the user read all", res);
  
        // localStorage.setItem("token", res?.data?.token);
        return {
          status: res?.status,
          data: res?.data?.data,
          token: res?.data?.token,
        };
      } catch (error: any) {
        return {
          message: error?.response?.data?.error,
          status: error?.response?.status,
        };
      }
    }
  );

  
  export const OrgNotificationReadAll = createAsyncThunk(
    "OrgNotificationReadAll",
    async (data: any) => {
      try {
        console.log("inside the org read all");
        const res = await api.post(`${API_URL}/help/markAllOrgNotificationsRead`, data);
        console.log("inside the org read all", res);
  
        // localStorage.setItem("token", res?.data?.token);
        return {
          status: res?.status,
          data: res?.data?.data,
          token: res?.data?.token,
        };
      } catch (error: any) {
        return {
          message: error?.response?.data?.error,
          status: error?.response?.status,
        };
      }
    }
  );