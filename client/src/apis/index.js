import axios from "axios";
const api_url = process.env.API_URL;

export const callApi = async (url, body, method = "POST") => {
  try {
    const response = await axios({
      url: "http://localhost:5000/" + url,
      data: body,
      method: method,
      timeout: 120000,
    });
    return response;
  } catch (error) {
    console.error("API call error:", error);
    throw error;
  }
};
