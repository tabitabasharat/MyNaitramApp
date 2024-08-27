import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../apiInterceptor";
import { API_URL } from "../client";





export const getHistoryByID = createAsyncThunk(
    "getHistoryByID",
    async (data: any) => {
      try {
        console.log("inside get history By user id");
        const res = await api.get(`${API_URL}/reward/getHistory/${data}`);
        console.log("iinside get history By user id", res);
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


  
export const getClaimStatus = createAsyncThunk(
  "getClaimStatus",
  async () => {
    try {
      console.log("inside get getClaimStatus");
      const res = await api.get(`${API_URL}/reward/getClaimStatus`);
      console.log("inside get getClaimStatus", res);
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
  }
);


export const claimReward = createAsyncThunk("claimReward", async (data:any) => {
  try {
    console.log("inside claim reward");
   
    const res = await api.post(`${API_URL}/reward/claimYourRewards`, data);
    console.log("inside claim reward", res);

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
