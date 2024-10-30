import { callApi } from ".";

export const newUserApi = async (url, body) => {
    return await callApi(url, body, "POST");
}

export const loginApi = async (url, body) => {
    return await callApi(url, body, "POST");
} 