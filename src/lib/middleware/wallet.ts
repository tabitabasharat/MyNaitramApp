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

interface GetAllTicketsPayload {
  page?: number;
  limit?: number;
  userId: string;
  category?: string[];  // assuming category is an array of strings
  startDate?: string;   // assuming dates are strings (ISO format)
  endDate?: string;
  [key: string]: any;   // To account for the rest parameter
}

// Define the shape of the response expected from the API
interface TicketResponse {
  status: number;
  data: {
    tickets: any[];      // Replace `any[]` with the actual type of tickets if known
    total: number;
  };
  currentPage: number;
  totalPages: number;
}

// Define the shape of the error object
interface ErrorResponse {
  message: string;
  status?: number;
}

// Create the async thunk with types for payload, response, and error
export const getAllTickets = createAsyncThunk<
  TicketResponse,               // The return type
  GetAllTicketsPayload,         // The payload type
  { rejectValue: ErrorResponse } // The rejectWithValue error type
>(
  'getAllTickets',
  async (
    { page = 1, limit = 10, userId, category, startDate, endDate, ...rest },
    { rejectWithValue },
  ) => {
    try {
      let queryParams: string[] = [];
      
      // Construct query params with proper type checking
      if (category && category.length > 0) {
        queryParams.push(`category=${JSON.stringify(category)}`);
      }
      queryParams.push(`page=${page}`);
      queryParams.push(`limit=${limit}`);
      if (startDate) queryParams.push(`startDate=${startDate}`);
      if (endDate) queryParams.push(`endDate=${endDate}`);

      const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
      
      // Make API request
      const res = await api.get(`${API_URL}/event/getTickets/${userId}${queryString}`);
      
      // Ensure that the response matches the expected type
      if (res?.status !== 200 || !res?.data) {
        throw new Error('Invalid response from API');
      }
      
      return {
        status: res.status,
        data: res.data,
        currentPage: page,
        totalPages: Math.ceil(res.data.total / limit),
      };
    } catch (error: any) {
      const errorMessage = error?.message || 'An error occurred';
      const statusCode = error?.response?.status || 500;
      console.error('Error fetching tickets:', error);

      return rejectWithValue({
        message: errorMessage,
        status: statusCode,
      });
    }
  }
);

// export const getHistoryById = createAsyncThunk(
//   'getHistoryById',
//   async userid => {
//     try {
//       console.log('inside get history by ID');
//       const res = await api.get(`${API_URL}/reward/getHistory/${userid}`);
//       // const res = await api.get(`${API_URL}/reward/getHistory/1`);
//       return {
//         status: res?.status,
//         data: res?.data,
//       };
//     } catch (error) {
//       return {
//         message: error?.response?.data?.error,
//         status: error?.response?.status,
//       };
//     }
//   },
// );

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