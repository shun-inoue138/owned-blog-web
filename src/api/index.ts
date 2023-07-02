import axios from "axios";

const localUrl = "http://localhost:3005/";

export const api = axios.create({
  baseURL: localUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
export const apiWithFile = axios.create({
  baseURL: localUrl,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
