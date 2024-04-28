import axios from "axios";

export const resendVerificationEmail = async (
  email: string
): Promise<string> => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/customer/resend-verification-email`,
      { email }
    );
    if (response.status === 200) {
      return "Verification email sent successfully!";
    } else {
      return "An error occurred";
    }
  } catch (error: any) {
    const errorMessage = error.response.data.error || "An error occurred";
    return errorMessage;
  }
};
