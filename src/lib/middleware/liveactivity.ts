import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../apiInterceptor";
import { API_URL } from "../client";

export const createChat = createAsyncThunk(
    "createChat",
    async (data: any) => {
      try {
        console.log("inside the create Chat");
        const res = await api.post(`${API_URL}/reward/createChat`, data);
        console.log("inside the create Chat", res);
  
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

  export const getChat = createAsyncThunk(
    "getChat",
    async (data: any) => {
      try {
        console.log("inside get Event Chat");
        const res = await api.get(`${API_URL}/reward/getChat/${data}`);
        console.log("inside get Event Chat", res);
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

  export const msgReaction = createAsyncThunk(
    "msgReaction",
    async (data: any) => {
      try {
        console.log("inside the msg reaction");
        const res = await api.post(`${API_URL}/reward/createChatReactions`, data);
        console.log("inside the msg reaction", res);
  
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


  export const getSponsored = createAsyncThunk(
    "getSponsored",
    async (data: any) => {
      try {
        console.log("inside the  create sponsored");
        const res = await api.post(`${API_URL}/helpcenter/createUserDetails`, data);
        console.log("inside the create sponsored", res);
  
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

  export const checkEventTicketStatus = createAsyncThunk(
    "checkEventTicketStatus",
    async (data: any) => {
      try {
        console.log("inside get Event Status");
        const res = await api.post(`${API_URL}/event/checkEventAndTicketStatus`,data);
        console.log("inside get Event Status", res);
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

  export const FollowPromoter = createAsyncThunk(
    "FollowPromoter",
    async (data: any) => {
      try {
        console.log("inside follow promoter");
        const res = await api.post(`${API_URL}/reward/createFollow`, data);
        console.log("inside follow promoter", res);
  
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


  export const UnFollowPromoter = createAsyncThunk(
    "UnFollowPromoter",
    async (data: any) => {
      try {
        console.log("inside unfollow promoter");
        const res = await api.post(`${API_URL}/reward/unfollow`, data);
        console.log("inside unfollow promoter", res);
  
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
  export const getFollowingPromoters = createAsyncThunk(
    "getFollowingPromoters",
    async (data: any) => {
      try {
        console.log("inside get following promoter");
        const res = await api.get(`${API_URL}/reward/getFollowers/${data}`);
        console.log("inside  get following promoter", res);
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