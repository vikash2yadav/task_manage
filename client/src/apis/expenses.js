import { callApi } from ".";

export const getExpenseApi = async (url, body) => {
  return await callApi(url, body, "POST");
};
