import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../apiInterceptor";
import { API_URL } from "../client";



export const getPayoutHistory = createAsyncThunk(
  "getPayoutHistory",
  async (data: any) => {
    try {
      console.log("inside get payout history  ");
      const res = await api.get(`${API_URL}/help/getPayoutHistory/${data}`);
      console.log("inside get payout history", res);
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


export const getPayoutBankDetail = createAsyncThunk(
    "getPayoutBankDetail ",
    async (data: any) => {
      try {
        console.log("inside get payout BANK history  ");
        const res = await api.get(`${API_URL}/help/getBankAccount/${data}`);
        console.log("inside get payout BANK history", res);
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


  export const getPayoutCryptoDetail = createAsyncThunk(
    "getPayoutCryptoDetail ",
    async (data: any) => {
      try {
        console.log("inside get payout crypto wallet history  ");
        const res = await api.get(`${API_URL}/help/getCryptoWallet/${data}`);
        console.log("inside get payout crypto wallet history", res);
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


  export const createPayoutCrypto= createAsyncThunk(
    "createPayoutCrypto",
    async (data: any) => {
      try {
        console.log("Inside create Payout Crypto");
        const res = await api.post(`${API_URL}/helpcenter/createCryptoWallet`, data);
        console.log("Inside create Payout Crypto", res);
  
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
    }
  );
  export const createPayoutBank= createAsyncThunk(
    "createPayoutBank",
    async (data: any) => {
      try {
        console.log("Inside create Payout Bank");
        const res = await api.post(`${API_URL}/helpcenter/createBankAccount`, data);
        console.log("Inside create Payout Bank", res);
  
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
    }
  );



