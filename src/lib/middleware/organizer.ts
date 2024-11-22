import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../apiInterceptor";
import { API_URL } from "../client";

export const getEventsByUID = createAsyncThunk("getEventsByUID", async (data: any) => {
  try {
    console.log("inside get events by user id");
    const res = await api.get(`${API_URL}/event/getUserEvents/${data?.userId}?page=${data?.page ? data?.page : 1}`);
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
});

// export const updateOrganizerProfile = createAsyncThunk(
//   "updateOrganizerProfile",
//   async (data: any) => {
//     try {
//       console.log("inside update Organizer Profile");
//       const res = await api.put(`${API_URL}/auth/updateOrganization`, {
//         profilePicture: data?.profilePicture,
//         linkedinUrl: data?.linkedinUrl,
//         youtubeUrl: data?.youtubeUrl,
//         twitterUrl: data?.twitterUrl,
//         fbUrl: data?.fbUrl,
//         instaUrl: data?.instaUrl,
//         bio: data?.bio,
//         tiktokUrl: data?.tiktokUrl,
//         userId: data?.userId,
//       });
//       console.log("inside update Organizer Profile", res);
//       // localStorage.setItem("token", res?.data?.token);
//       return {
//         status: res?.status,
//         data: res?.data?.data,
//       };
//     } catch (error: any) {
//       return {
//         message: error?.response?.data?.error,
//         status: error?.response?.status,
//       };
//     }
//   }
// );

export const updateOrganizerProfile = createAsyncThunk("updateOrganizerProfile", async (data: any) => {
  try {
    console.log("inside update Organizer Profile");

    const res = await api.post(`${API_URL}/auth/createOrUpdateOrganizerProfile`, data);
    console.log("inside update Organizer Profile", res);

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

// export const getOrganizerByID = createAsyncThunk(
//   "getOrganizerByID",
//   async (data: any) => {
//     try {
//       console.log("inside get org by id");
//       const res = await api.get(`${API_URL}/auth/getuserByid/${data}`);
//       console.log("inside get org by id", res);

//       return {
//         status: res?.status,
//         data: res?.data?.data,
//       };
//     } catch (error: any) {
//       return {
//         message: error?.response?.data?.error,
//         status: error?.response?.status,
//       };
//     }
//   }
// );

export const getOrganizerByID = createAsyncThunk("getOrganizerByID", async (data: any) => {
  try {
    console.log("inside get org by id");
    const res = await api.get(`${API_URL}/auth/getOrganizerById/${data}`);
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
});

// export const getOrganizerSocialProfile = createAsyncThunk(
//   "getOrganizerSocialProfile",
//   async (data: any) => {
//     try {
//       console.log("inside get social org by id");
//       const res = await api.get(
//         `${API_URL}/event/getUserorganizationEvents/${data}`
//       );
//       console.log("inside get social org by id", res);

//       return {
//         status: res?.status,
//         data: res?.data,
//       };
//     } catch (error: any) {
//       return {
//         message: error?.response?.data?.error,
//         status: error?.response?.status,
//       };
//     }
//   }
// );

export const getOrganizerSocialProfile = createAsyncThunk("getOrganizerSocialProfile", async (data: any) => {
  try {
    console.log("inside get social org by id");
    const res = await api.get(`${API_URL}/auth/getOrganizerProfile/${data}`);
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
});

export const getOrganizerLiveSocialProfile = createAsyncThunk("getOrganizerLiveSocialProfile", async (data: any) => {
  try {
    console.log("inside get social except past org by id");
    const res = await api.get(`${API_URL}/auth/getOrganizerProfileFuture/${data}`);
    console.log("inside get social except past  by id", res);

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

export const OrgProfileCheck = createAsyncThunk("OrgProfileCheck", async (data: any) => {
  try {
    console.log("inside the OrgProfileCheck");
    const res = await api.post(`${API_URL}/auth/checkOrganizerProfile`, data);
    console.log("inside the OrgProfileCheck", res);

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

export const getOrganizerDetail = createAsyncThunk("getOrganizerDetail", async (data: any) => {
  try {
    console.log("inside get org details by id");
    const res = await api.get(`${API_URL}/event/getUserorganizationEventss/${data}`);
    console.log("inside get org details by id", res);
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

export const getSalesData = createAsyncThunk("getSalesData", async (data: any) => {
  try {
    console.log("inside get org details by id");
    const res = await api.get(`${API_URL}/user/getLiveEvent/${data}`);
    console.log("inside get org details by id", res);

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

////////////  Zeeshan Defined API Thunks

export const getUserInfoByUserId = createAsyncThunk("getUserInfoByUserID", async (data: any) => {
  try {
    console.log("inside get Get User info by User id");
    const res = await api.get(`${API_URL}/api/getUserInfo/${data}`);
    console.log("inside get User Info by User id", res?.data);

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

export const createExpressAccountByUserId = createAsyncThunk("createExpressAccountByUserID", async (data: any) => {
  try {
    console.log("inside get create Express Account by User id");
    const res = await api.get(`${API_URL}/api/createExpressAccount/${data}`);
    console.log("inside get create Express Account by User id", res);

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
