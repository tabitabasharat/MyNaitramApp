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
  
  