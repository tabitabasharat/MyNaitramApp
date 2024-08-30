import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../apiInterceptor";
import { API_URL } from "../client";

export const getEventsByUID = createAsyncThunk(
  " getEventsByUID",
  async (data: any) => {
    try {
      console.log("inside get events by user id");
      const res = await api.get(`${API_URL}/event/getUserEvents/${data}`);
      console.log("inside get events by user id", res);

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

export const updateOrganizerProfile = createAsyncThunk(
  "updateOrganizerProfile",
  async (data: any) => {
    try {
      console.log("inside update Organizer Profile");
      const res = await api.put(`${API_URL}/auth/updateOrganization`, {
        profilePicture: data?.profilePicture,
        linkedinUrl: data?.linkedinUrl,
        youtubeUrl: data?.youtubeUrl,
        twitterUrl: data?.twitterUrl,
        fbUrl: data?.fbUrl,
        instaUrl: data?.instaUrl,
        bio: data?.bio,
        tiktokUrl: data?.tiktokUrl,
        userId:data?.userId
      });
      console.log("inside update Organizer Profile", res);
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


export const getOrganizerByID = createAsyncThunk(
  "getOrganizerByID",
  async (data: any) => {
    try {
      console.log("inside get org by id");
      const res = await api.get(`${API_URL}/auth/getuserByid/${data}`);
      console.log("inside get org by id", res);

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


export const getOrganizerSocialProfile = createAsyncThunk(
  "getOrganizerSocialProfile",
  async (data: any) => {
    try {
      console.log("inside get social org by id");
      const res = await api.get(`${API_URL}/event/getUserorganizationEvents/${data}`);
      console.log("inside get social org by id", res);

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