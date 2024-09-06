import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../apiInterceptor";
import { API_URL } from "../client";

export const createChat = createAsyncThunk(
    "createChat",
    async (data: any) => {
      try {
        console.log("inside the create Chat");
        const res = await api.post(`${API_URL}/reward/createChat`, data);
        console.log("inside the create Chat", res);
  
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

  export const getChat = createAsyncThunk(
    "getChat",
    async (data: any) => {
      try {
        console.log("inside get Event Chat");
        const res = await api.get(`${API_URL}/reward/getChat/${data}`);
        console.log("inside get Event Chat", res);
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