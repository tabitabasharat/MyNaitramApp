import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../apiInterceptor";
import { API_URL } from "../client";




  export const getProfileInfo = createAsyncThunk(
    "getProfileInfo",
    async (data) => {
      try {
        console.log("inde the profile");
        const res = await api.get(`${API_URL}/api/getUserInfo/${data}`);
        // localStorage.setItem("token", res?.data?.token);
        return {
          status: res?.status,
          data: res?.data,
        };
      } catch (error:any) {
        return {
          message: error?.response?.data?.error,
          status: error?.response?.status,
        };
      }
    }
  );

  export const getAllEvents = createAsyncThunk(
    "getAllEvents",
    async () => {
      try {
        console.log("inside get All Events");
        const res = await api.get(`${API_URL}/event/getEventsAll`);
        console.log("inside get all events response",res)
        // localStorage.setItem("token", res?.data?.token);
        return {
          status: res?.status,
          data: res?.data,
        };
      } catch (error:any) {
        return {
          message: error?.response?.data?.error,
          status: error?.response?.status,
        };
      }
    }
  );

  export const getEventById = createAsyncThunk(
    "getEventById",
    async (data:any) => {
      try {
        console.log("inside get Event By id");
        const res = await api.get(`${API_URL}/event/getEvents/${data}`);
        console.log("inside get specific event",res)
        // localStorage.setItem("token", res?.data?.token);
        return {
          status: res?.status,
          data: res?.data,
        };
      } catch (error:any) {
        return {
          message: error?.response?.data?.error,
          status: error?.response?.status,
        };
      }
    }
  );