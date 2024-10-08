import axios from "axios";
import queryString from "query-string";
import { appInfo } from "../constants/appInfos";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config: any) => {
  const accesstoken = getToken();

  config.headers = {
    Authorization: accesstoken ? `Bearer ${accesstoken}` : "",
    Accept: "application/json",
    ...config.headers,
  };

  return { ...config, data: config.data ?? null };
});

axiosClient.interceptors.response.use(
  (res) => {
    if (res.data && res.status >= 200 && res.status < 300) {
      return res.data;
    } else {
      return Promise.reject(res.data);
    }
  },
  (error) => {
    const { response } = error;
    return Promise.reject(response.data);
  }
);

export default axiosClient;

const getToken = (): string => {
  const authInfo = localStorage.getItem(appInfo.localKey);
  return JSON.parse(authInfo as any)?.token || "";
};
