import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../apiInterceptor";
import { API_URL } from "../client";

// Getting user Live Events
export const getOrganizerProfileFutures = createAsyncThunk("getOrganizerProfileFutures", async (data: any) => {
  try {
    console.log("inside the user Live/Features Events");
    const res = await api.get(`${API_URL}/auth/getOrganizerProfileFutures/${data}`);
    // localStorage.setItem("token", res?.data?.token);
    return {
      status: res?.status,
      data: res?.data,
    };
  } catch (error: any) {
    return {
      message: error?.response?.data?.error,
      status: error?.response?.status,
    };
  }
});

// Getting user Live Events
export const getOrganizerPastEvents = createAsyncThunk("getUserPastEvents", async (data: any) => {
  try {
    console.log("inside the user Past Events");
    const res = await api.get(`${API_URL}/event/getUserPastEvents/${data}`);
    // localStorage.setItem("token", res?.data?.token);
    return {
      status: res?.status,
      data: res?.data,
    };
  } catch (error: any) {
    return {
      message: error?.response?.data?.error,
      status: error?.response?.status,
    };
  }
});
