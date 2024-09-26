import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../apiInterceptor";
import { API_URL } from "../client";



export const getPayoutHistory = createAsyncThunk(
  "getPayoutHistory",
  async (data: any) => {
    try {
      console.log("inside get payout history  ");
      const res = await api.get(`${API_URL}/help/getPayoutHistory/${data}`);
      console.log("inside get payout history", res);
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


export const getPayoutBankDetail = createAsyncThunk(
    "getPayoutBankDetail ",
    async (data: any) => {
      try {
        console.log("inside get payout BANK history  ");
        const res = await api.get(`${API_URL}/help/getBankAccount/${data}`);
        console.log("inside get payout BANK history", res);
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


  export const getPayoutCryptoDetail = createAsyncThunk(
    "getPayoutCryptoDetail ",
    async (data: any) => {
      try {
        console.log("inside get payout crypto wallet history  ");
        const res = await api.get(`${API_URL}/help/getCryptoWallet/${data}`);
        console.log("inside get payout crypto wallet history", res);
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


  export const createPayoutCrypto= createAsyncThunk(
    "createPayoutCrypto",
    async (data: any) => {
      try {
        console.log("Inside create Payout Crypto");
        const res = await api.post(`${API_URL}/helpcenter/createCryptoWallet`, data);
        console.log("Inside create Payout Crypto", res);
  
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
  export const createPayoutBank= createAsyncThunk(
    "createPayoutBank",
    async (data: any) => {
      try {
        console.log("Inside create Payout Bank");
        const res = await api.post(`${API_URL}/helpcenter/createBankAccount`, data);
        console.log("Inside create Payout Bank", res);
  
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



  export const deleteBankAccount = createAsyncThunk(
    "deleteBankAccount",
    async (data:any) => {
      try {
        console.log(data, "inside the delete bank account");
  
        const res = await api.delete(
          `${API_URL}/help/deleteBankAccount/${data}`
        );
        // localStorage.setItem("token", res?.data?.token);
        console.log("inside the delete bank account", res);
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

  export const deleteCryptoAccount = createAsyncThunk(
    "deleteCryptoAccount",
    async (data:any) => {
      try {
        console.log(data, "inside the delete crypto account");
  
        const res = await api.delete(
          `${API_URL}/help/deleteCryptoWallet/${data}`
        );
        // localStorage.setItem("token", res?.data?.token);
        console.log("inside the delete crypto account", res);
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


  export const getPaidDetail = createAsyncThunk(
    "getPaidDetail ",
    async (data: any) => {
      try {
        console.log("inside get Paid Detail  ");
        const res = await api.get(`${API_URL}/user/payoutFunds/${data}`);
        console.log("inside get Paid Detail ", res);
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


  export const SubmitPaid= createAsyncThunk(
    "SubmitPaid",
    async (data: any) => {
      try {
        console.log("Inside submit details");
        const res = await api.post(`${API_URL}/helpcenter/createFund`, data);
        console.log("Inside submit details", res);
  
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
