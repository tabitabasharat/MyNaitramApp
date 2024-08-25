import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../apiInterceptor";
import { API_URL } from "../client";

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
    } catch (error: any) {
      return {
        message: error?.response?.data?.error,
        status: error?.response?.status,
      };
    }
  }
);

export const getAllEvents = createAsyncThunk("getAllEvents", async () => {
  try {
    console.log("inside get All Events");
    const res = await api.get(`${API_URL}/event/getEventsAll`);
    console.log("inside get all events response", res);
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
});

export const getEventById = createAsyncThunk(
  "getEventById",
  async (data: any) => {
    try {
      console.log("inside get Event By user id");
      const res = await api.get(`${API_URL}/event/getEvents/${data}`);
      console.log("inside get specific user event", res);
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

export const getTicketsById = createAsyncThunk(
  "getTicketsById",
  async (data: any) => {
    try {
      const res = await api.get(`${API_URL}/getTicket/${data}`);
      console.log("inside get specific event", res);
      // localStorage.setItem("token", res?.data?.token);
      return {
        status: res?.status,
        data: res,
      };
    } catch (error: any) {
      return {
        message: error?.response?.data?.error,
        status: error?.response?.status,
      };
    }
  }
);

export const whitelistcheck = createAsyncThunk(
  "whitelistcheck",
  async (data: any) => {
    try {
      console.log("Inside Whitelist check");
      const res = await api.post(`${API_URL}/auth/getUserWhiteListed`, data);
      console.log("Inside Whitelist check", res);

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
export const getAllEventsCount = createAsyncThunk(
  "getAllEventsCount",
  async () => {
    try {
      console.log("inside get Event By id");
      const res = await api.get(`${API_URL}/getTicketCount`);
      console.log("inside get specific event", res);
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

export const createevent = createAsyncThunk(
  "createevent",
  async (data: any) => {
    try {
      console.log("Inside create Event");
      const res = await api.post(`${API_URL}/event/createEvent`, data);
      console.log("Inside create Event Res", res);

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


export const getViewAllEvent = createAsyncThunk(
  "getViewAllEvent",
  async (data:any) => {
    console.log("this is page data",data)
    try {
      console.log("inside get Events ");
      const res = await api.get(`${API_URL}/event/getEventsAll?page=${data?.page?data?.page:1}`);
      console.log("inside get all Events ", res);
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


export const getEventByEventId = createAsyncThunk(
  "getEventByEventId",
  async (data: any) => {
    try {
      console.log("inside get Event By Eventid");
      const res = await api.get(`${API_URL}/event/getEventById/${data}`);
      console.log("inside get specific event by eventId", res);
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


export const getViewPastEvents = createAsyncThunk(
  "getViewPastEvents",
  async () => {
    try {
      console.log("inside get Past Events ");
      const res = await api.get(`${API_URL}/event/getPastEvents`);
      console.log("inside get Past Events ", res);
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





export const getEventCount = createAsyncThunk(
  "getEventCount",
  async (data: any) => {
    try {
      console.log("inside get Event count By Eventid ");
      const res = await api.get(`${API_URL}/event/getEvents/${data}`);
      console.log("inside get Event count By Eventid", res);
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

export const getLiveEventById = createAsyncThunk(
  "getLiveEventById",
  async (data: any) => {
    try {
      console.log("inside get Live Event By user id");
      const res = await api.get(`${API_URL}/event/getLiveEvents/${data}`);
      console.log("inside get specific user Live event", res);
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