import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../apiInterceptor";
import { API_URL } from "../client";

export const createVeueForm = createAsyncThunk("createVeueForm", async (data: any) => {
  try {
    console.log("inside the create createVeueForm");
    const res = await api.post(`${API_URL}/reward/createVenue`, data);
    console.log("inside the create createVeueForm", res);

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
});
