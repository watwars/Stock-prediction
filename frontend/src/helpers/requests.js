import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000",
});

// instance.defaults.timeout = 2500;

export const authRequests = async (url, body) => {
  const response = await instance.post(url, body);
  console.log(response);
  return response.data;
};

export const getUserSavedStocks = async (url, body) => {
  console.log(body);
  const response = await instance.post(url, body);
  return response.data;
};

export const updateStock = async (url, body) => {
  const response = await instance.put(url, body);
  return response.data;
};
