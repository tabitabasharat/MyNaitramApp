import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../apiInterceptor";
import { API_URL } from "../client";


export const getScannerByEventID = createAsyncThunk(
    "getScannerByEventID",
    async (data: any) => {
      try {
        console.log("inside get Scanner By event id");
        const res = await api.get(`${API_URL}/auth/getScannersByEventId/${data}`);
        console.log("inside get Scanner By event id", res);
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

  export const CreateScanner = createAsyncThunk("CreateScanner", async (data:any) => {
    try {
      console.log("inside Create Scanner");
     
      const res = await api.post(`${API_URL}/auth/createScanner`, data);
      console.log("inside Create Scanner", res);
  
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

  export const ScannerEmail = createAsyncThunk("ScannerEmail", async (data:any) => {
    try {
      console.log("inside ScannerEmail");
     
      const res = await api.post(`${API_URL}/auth/emailScanner/${data}`);
      console.log("inside ScannerEmail", res);
  
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