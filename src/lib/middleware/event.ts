import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../apiInterceptor";
import { API_URL } from "../client";

export const getProfileInfo = createAsyncThunk("getProfileInfo", async (data) => {
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
});

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

export const getEventById = createAsyncThunk("getEventById", async (data: any) => {
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
});

export const getTicketsById = createAsyncThunk("getTicketsById", async (data: any) => {
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
});

export const whitelistcheck = createAsyncThunk("whitelistcheck", async (data: any) => {
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
});
export const getAllEventsCount = createAsyncThunk("getAllEventsCount", async () => {
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
});

export const createevent = createAsyncThunk("createevent", async (data: any) => {
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
});

export const getViewAllEvent = createAsyncThunk("getViewAllEvent", async (data: any) => {
  console.log("this is page data", data);
  try {
    console.log("inside get Events ");
    // const res = await api.get(`${API_URL}/event/getEventsAll?page=${data?.page?data?.page:1}`);
    const res = await api.get(
      `${API_URL}/event/getEventsAll?page=${data?.page ? data?.page : 1}&limit=${data?.limit ? data?.limit : 12}&category=${data?.category}&Free=${
        data?.free
      }&startDate=${data?.startDate}&endDate=${data?.endDate}&minPrice=${data?.minPrice}&maxPrice=${data?.maxPrice}`
    );

    // const res = await api.get(
    //   `${API_URL}/event/getEventsAll?page=${
    //     data?.page ? data?.page : 1
    //   }&location=${
    //     data?.location
    //   }&startDate=${data?.startDate}&today=${data?.today}&chooseDate=${data?.chooseDate} `
    // );
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
});

////// This is for analytics too
export const getEventByEventId = createAsyncThunk("getEventByEventId", async (data: any) => {
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
});

export const getViewPastEvents = createAsyncThunk("getViewPastEvents", async (data: any) => {
  try {
    console.log("inside get Past Events ");
    // const res = await api.get(`${API_URL}/event/getPastEvents`);

    // const res = await api.get(
    //   `${API_URL}/event/getPastEvents?page=${
    //     data?.page ? data?.page : 1
    //   }&startDate=${data?.startDate}&today=${data?.today}&location=${
    //     data?.location}&thisMonth=${data.thisMonth}&chooseDate=${data?.chooseDate}`
    // );

    const res = await api.get(
      `${API_URL}/event/getPastEvents?page=${data?.page ? data?.page : 1}&limit=${data?.limit ? data?.limit : 12}&category=${data?.category}&Free=${
        data?.free
      }&startDate=${data?.startDate}&endDate=${data?.endDate}&minPrice=${data?.minPrice}&maxPrice=${data?.maxPrice}`
    );
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
});

export const getViewPastEventsBox = createAsyncThunk("getViewPastEventsBox", async (data: any) => {
  try {
    console.log("inside get Past Events ");
    const res = await api.get(`${API_URL}/event/getPastEvents?page=${data?.page ? data?.page : 1}`);
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
});

export const getEventCount = createAsyncThunk("getEventCount", async (data: any) => {
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
});

export const getLiveEventById = createAsyncThunk("getLiveEventById", async (data: any) => {
  try {
    console.log("inside get Live Event By user id");
    // const res = await api.get(`${API_URL}/event/getLiveEvents/${data}`);
    const res = await api.get(
      `${API_URL}/event/getLiveEvents/${data?.userId}?page=${data?.page ? data?.page : 1}&limit=${data?.limit ? data?.limit : 12}&category=${
        data?.category
      }&Free=${data?.free}&startDate=${data?.startDate}&endDate=${data?.endDate}&minPrice=${data?.minPrice}&maxPrice=${data?.maxPrice}`
    );
    // const res = await api.get(
    //   `${API_URL}/event/getLiveEvents/${data?.userId}?page=${
    //     data?.page ? data?.page : 1
    //   }&startDate=${data?.startDate}&today=${data?.today}&location=${
    //     data?.location}&thisMonth=${data.thisMonth}&chooseDate=${data?.chooseDate}`
    // );

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
});

export const updateEvent = createAsyncThunk("updateEvent", async (data: any) => {
  try {
    console.log("inside update Event");
    const res = await api.put(`${API_URL}/event/updateEvent`, {
      userId: data?.userId,
      eventId: data?.eventId,
      name: data?.name,
      category: data?.category,
      eventDescription: data?.eventDescription,
      location: data?.location,
      ticketStartDate: data?.ticketStartDate,
      ticketEndDate: data?.ticketEndDate,
      startTime: data?.startTime,
      endTime: data?.endTime,
      mainEventImage: data?.mainEventImage,
      coverEventImage: data?.coverEventImage,
      tickets: data?.tickets,
      // totalComplemantaryTickets: data?.totalComplemantaryTickets,
      fbUrl: data?.fbUrl,
      instaUrl: data?.instaUrl,
      youtubeUrl: data?.youtubeUrl,
      twitterUrl: data?.twitterUrl,
      telegramUrl: data?.telegramUrl,
      tiktokUrl: data?.tiktokUrl,
      linkedinUrl: data?.linkedinUrl,
      eventmedia: data?.eventmedia,
      tags: data?.tags,
      stopBy: data?.stopBy,
    });
    console.log("inside update Event", res);
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
});

export const LikeEvent = createAsyncThunk("LikeEvent", async (data: any) => {
  try {
    console.log("Inside like event");
    const res = await api.post(`${API_URL}/event/likeEvent`, data);
    console.log("Inside like event", res);

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
});

export const disLikeEvent = createAsyncThunk("disLikeEvent", async (data: any) => {
  try {
    console.log("Inside dislike event");
    const res = await api.post(`${API_URL}/event/dislikeEvent`, data);
    console.log("Inside dislike event", res);

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
});

export const getEventAttend = createAsyncThunk("getEventAttend", async (data: any) => {
  try {
    const res = await api.get(`${API_URL}/buying/getAttendees/${data}`);
    console.log("inside get attendees", res);
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
});

export const ticketStatus = createAsyncThunk("ticketStatus", async (data: any) => {
  try {
    console.log("inside ticket status");

    const res = await api.post(`${API_URL}/buying/checkTicketExists`, data);

    console.log("inside ticket statu", res);
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

export const FollowPromoterStatus = createAsyncThunk("FollowPromoterStatus", async (data: any) => {
  try {
    console.log("inside get FollowPromoterStatus ");

    const res = await api.get(`${API_URL}/reward/checkFollowStatus/${data?.userId}/${data?.followId}`);

    // const res = await api.post(`${API_URL}/reward/checkFollowStatus`, data);
    console.log("inside get FollowPromoterStatus", res);

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
});

//  Zishan defined APis
export const createForm = createAsyncThunk("createForm", async (data: any) => {
  try {
    console.log("Inside the reason createForm");

    const res = await api.post(`${API_URL}/event/createForm`, data);
    console.log("Iside the creatForm status ", res);

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

export const deleteEvent = createAsyncThunk("deleteEvent", async (data: any) => {
  try {
    console.log("Inside the Delete Event");

    const { userId, eventId } = data;

    const res = await api.delete(`${API_URL}/event/deleteEvent/${eventId}/${userId}`, data);
    console.log("Iside the Delete Event status ", res);

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

export const stopTicketSales = createAsyncThunk("stopTicketSales", async (data: any) => {
  try {
    console.log("Inside the Stop Sales");
    console.log("Body Data to stop Sales ", data);

    const res = await api.post(`${API_URL}/event/stopTicketSales`, data);
    console.log("Iside the Stop Sales status ", res);

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

export const reportEvent = createAsyncThunk("reportEvent", async (data: any) => {
  try {
    console.log("Inside the Report Event");
    console.log("Body Data to Report Event ", data);

    const res = await api.post(`${API_URL}/event/submitReport`, data);
    console.log("Iside the Report Event status ", res);

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

export const submitFeedback = createAsyncThunk("submitFeedback", async (data: any) => {
  try {
    console.log("Inside the Submit Feedback");
    console.log("Body Data to Submit Feedback ", data);

    const res = await api.post(`${API_URL}/event/submitFeedback`, data);
    console.log("Iside the Submit Feedback status ", res);

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
