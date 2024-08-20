import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../apiInterceptor";
import { API_URL } from "../client";

export const showProfile = createAsyncThunk(
  "showprofile",
  async (data: any) => {
    try {
      console.log("inside show Profile");
      const res = await api.get(`${API_URL}/auth/showProfile/${data}`);
      console.log("inside show Profile", res);
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

export const getUserByID = createAsyncThunk(
  "getUserByID",
  async (data: any) => {
    try {
      console.log("inside get user details");
      const res = await api.get(`${API_URL}/auth/getuserByid/${data}`);
      console.log("inside get user details", res);
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

export const updateProfile = createAsyncThunk(
  "updateProfile",
  async (data: any) => {
    try {
      console.log("inside the create Profile");
      const res = await api.post(`${API_URL}/auth/updateProfile`, data);
      console.log("inside the create Profile", res);

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

export const createLiveActivity = createAsyncThunk(
  "createLiveActivity",
  async (data: any) => {
    try {
      console.log("inside the create Profile");
      const res = await api.post(`${API_URL}/auth/createLiveActivity`, data);
      console.log("inside the create Profile", res);

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

export const showLiveActivity = createAsyncThunk(
  "showLiveActivity",
  async (data: any) => {
    try {
      console.log("inside show  LiveActivity");
      const res = await api.get(`${API_URL}/auth/getActivity/${data}`);
      console.log("inside show LiveActivity", res);
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

export const updateLiveActivity = createAsyncThunk(
  "updateLiveActivity",
  async (data: any) => {
    try {
      console.log("inside updateLiveActivity");
      const res = await api.put(`${API_URL}/auth/updateLiveActivity/${data}`);
      console.log("inside updateLiveActivity", res);
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

// export const updateLiveActivity = createAsyncThunk(
//   "updateLiveActivity",
//   async (data: any) => {
//     try {
//       console.log("inside updateLiveActivity");
//       const res = await api.put(
//         `${API_URL}/auth/updateLiveActivity/${data.id}`,
//         data
//       );
//       console.log("inside updateLiveActivity", res);

//       // localStorage.setItem("token", res?.data?.token);
//       return {
//         status: res?.status,
//         data: res?.data?.data,
//         token: res?.data?.token,
//       };
//     } catch (error: any) {
//       return {
//         message: error?.response?.data?.error,
//         status: error?.response?.status,
//       };
//     }
//   }
// );
