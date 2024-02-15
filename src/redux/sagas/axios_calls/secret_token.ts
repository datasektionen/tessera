import axios from "axios";

export const GetSecretToken = async (eventID: number) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/events/${eventID}/manage/secret-token`,
      {
        withCredentials: true,
      }
    );
    return response.data.secret_token;
  } catch (error: any) {
    console.error(error);
    return "";
  }
};
