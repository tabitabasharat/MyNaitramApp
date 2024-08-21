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
      const res = await api.put(`${API_URL}/auth/updateLiveActivity/${data?.userID}`,{
        linkedinUrl:data?.linkedinUrl,
        fbUrl:data?.fbUrl,
        instaUrl:data?.instaUrl,
        telegramUrl:data?.telegramUrl,
        isActive:data?.isActive
      });
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

export const deleteAccount = createAsyncThunk(
  "deleteAccount",
  async (data:any) => {
    try {
      console.log(data, "inside the delete account");

      const res = await api.delete(
        `${API_URL}/auth/deleteAccount/${data}`
      );
      // localStorage.setItem("token", res?.data?.token);
      console.log("inside the delete account", res);
      return {
        status: res?.status,
        data: res?.data?.data,
      };
    } catch (error:any) {
      console.log("this is the error", error);
      return {
        message: error?.response?.data?.error,
        status: error?.response?.status,
      };
    }
  }
);


export const createHelpCenter = createAsyncThunk(
  "createHelpCenter",
  async (data: any) => {
    try {
      console.log("inside the create HelpCenter");
      const res = await api.post(`${API_URL}/helpcenter/createHelpCenter`, data);
      console.log("inside the create HelpCenter", res);

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