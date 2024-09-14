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
  