import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../apiInterceptor";
import { API_URL } from "../client";

export const getEventsByUID = createAsyncThunk(
  " getEventsByUID",
  async (data:any) => {
    try {
      console.log("inside get events by user id");
      const res = await api.get(`${API_URL}/event/getUserEvents/${data}`);
      console.log("inside get events by user id", res);

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
  }
);
