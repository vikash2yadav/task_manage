import { callApi } from ".";

export const getSavingApi = async (url, body) => {
  return await callApi(url, body, "POST");
};
