import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../apiInterceptor";
import { API_URL } from "../client";


export const signup = createAsyncThunk("signup", async (data:any) => {
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
      const res = await api.post(`${API_URL}/auth/login`, data);
      console.log("inside the Login modal",res);
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
  
  export const forgetPassword = createAsyncThunk(
    "forgetpassword",
    async (data:any) => {
      try {
        console.log("inside the modal");
        const res = await api.post(`${API_URL}/auth/forgot`, data);
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
    }
  );
  export const verifysignup = createAsyncThunk("verifysignup", async (data:any) => {
    try {
      console.log("Inside Sign-Up Verify");
      const res = await axios.post(`${API_URL}/auth/verify/code`, data);
      console.log(res);
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

  export const updateverifycode = createAsyncThunk("updateverifycode", async (data:any) => {
    try {
      console.log("Again sending verify code");
      const res = await axios.post(`${API_URL}/auth/updateVerificationCode`, data);
      console.log(res);
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


 
  export const newPassword = createAsyncThunk("newPassword", async (data:any) => {
    try {
      console.log("inside the Reset Password");
      const res = await api.post(`${API_URL}/auth/resetpassword`, data);
      console.log(res)
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

  