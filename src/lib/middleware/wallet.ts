import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../apiInterceptor";
import { API_URL } from "../client";



export const getTicketsByID = createAsyncThunk(
  "getTicketsByID",
  async (data: any) => {
    try {
      console.log("inside get Tickets By user id");
      const res = await api.get(`${API_URL}/buying/viewTicketDetails/${data}`);
      console.log("inside get Tickets By user id", res);
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

export const getTicketByQR = createAsyncThunk(
  "getTicketByQR",
  async (data: any) => {
    try {
      console.log("inside get Tickets By QR");
      const res = await api.get(`${API_URL}/buying/getTicketByQR/${data}`);
      console.log("inside get Tickets By QR", res);
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


export const getBalanceByID = createAsyncThunk(
  "getBalanceByID",
  async (data: any) => {
    try {
      console.log("inside get balance By user id");
      const res = await api.get(`${API_URL}/reward/getYourBalance/${data}`);
      console.log("inside get balance By user id", res);
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


export const getgraphByID = createAsyncThunk(
  "getgraphByID ",
  async (data: any) => {
    try {
      console.log("inside get graph history");
      const res = await api.get(`${API_URL}/reward/getHistoryRecord/${data}`);
      console.log("inside get graph history", res);
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


export const getWalletCollectByUserID = createAsyncThunk(
  "getWalletCollectByUserID",
  async (data: any) => {
    try {
      console.log("inside get Wallet Collect UserID");
      const res = await api.get(`${API_URL}/reward/getUserCollectibles/${data}`);
      console.log("inside get Wallet Collect UserID", res);
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


export const getwallethistory = createAsyncThunk(
  "getwallethistory ",
  async (data: any) => {
    try {
      console.log("inside get wallet history");
      const res = await api.get(`${API_URL}/reward/getHistory/${data}`);
      console.log("inside get wallet history", res);
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