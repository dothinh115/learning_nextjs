import axios, { AxiosInstance } from "axios";

export const fetcher = (...args: any) => axios(args).then((res) => res);
let userInfo = null;
if (typeof window !== "undefined") {
  userInfo = localStorage.getItem("userInfo");
}

let token = null;
if (userInfo) {
  token = JSON.parse(userInfo).accessToken;
}

export const API: AxiosInstance = axios.create({
  baseURL: "https://nodejs.dothinh.info/api",
  headers: {
    Authorization: "Bearer " + token,
  },
});

API.interceptors.response.use(
  (res: any) => {
    return res;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);
