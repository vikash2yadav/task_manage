import { callApi } from ".";

export const getIncomeApi = async (url, body) => {
  return await callApi(url, body, "POST");
};
