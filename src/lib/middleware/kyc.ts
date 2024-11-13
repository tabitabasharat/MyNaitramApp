import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../apiInterceptor";
import { API_URL } from "../client";

export const kycSubmition = createAsyncThunk("whitelistcheck", async (data: any) => {
  try {
    console.log("Inside Whitelist check");
    const res = await api.post(`${API_URL}/helpcenter/createKYC`, data);
    console.log("Inside KYC API check", res);

    // localStorage.setItem("token", res?.data?.token);
    return {
      status: res?.status,
      data: res?.data,
      token: res?.data?.token,
    };
  } catch (error: any) {
    return {
      message: error?.response?.data?.error,
      status: error?.response?.status,
    };
  }
});
