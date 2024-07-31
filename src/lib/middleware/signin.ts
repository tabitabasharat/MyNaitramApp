import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../apiInterceptor";
import { API_URL } from "../client";


export const signup = createAsyncThunk("signin", async (data:any) => {
    try {
      console.log("Signup");
      const res = await api.post(`${API_URL}/auth/signup`, data);
      // localStorage.setItem("token", res?.data?.token);
      return {
        status: res?.status,
        data: res?.data?.data,
        token: res?.data?.token,
      };
    } catch (error:any) {
      return {
        message: error?.response?.data?.error,
        status: error?.response?.status,
      };
    }
  });

  export const signin = createAsyncThunk("signin", async (data:any) => {
    try {
      console.log("inside the Login modal");
      const res = await api.post(`${API_URL}/auth/login`, data);
      // localStorage.setItem("token", res?.data?.token);
      return {
        status: res?.status,
        data: res?.data?.data,
        token: res?.data?.token,
      };
    } catch (error:any) {
      return {
        message: error?.response?.data?.error,
        status: error?.response?.status,
      };
    }
  });
  
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