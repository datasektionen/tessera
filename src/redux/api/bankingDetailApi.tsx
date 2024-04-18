import axios from "axios";
import { IBankingDetailsReq } from "../../types";
import { toast } from "react-toastify";

const API_URL = process.env.REACT_APP_BACKEND_URL;

const api = {
  getBankingDetails: async (teamID: number) => {
    const response = await axios.get(
      `${API_URL}/teams/${teamID}/banking-details`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  },

  submitBankingDetails: async (
    teamID: number,
    bankingDetails: IBankingDetailsReq
  ) => {
    const response = await axios.post(
      `${API_URL}/teams/${teamID}/banking-details`,
      bankingDetails,
      {
        withCredentials: true,
      }
    );

    if (response.status === 201) {
      setTimeout(() => {
        toast.success("Banking details updated successfully!");
      }, 300);
      await new Promise((resolve) => setTimeout(resolve, 200));
    }

    return response.data;
  },

  deleteBankingDetails: async (teamID: number) => {
    const response = await axios.delete(
      `${API_URL}/teams/${teamID}/banking-details`,
      {
        withCredentials: true,
      }
    );

    if (response.status === 204) {
      setTimeout(() => {
        toast.success("Banking details deleted successfully!");
      }, 300);
      await new Promise((resolve) => setTimeout(resolve, 200));
    }

    return response.data;
  },
};

export default api;
