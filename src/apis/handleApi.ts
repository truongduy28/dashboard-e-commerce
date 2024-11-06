/** @format */

import axiosClient from "./axiosClient";

const handleAPI = async (
  url: string,
  data?: any,
  method?: "post" | "put" | "get" | "delete",
  params?: any
) => {
  return await axiosClient(url, {
    method: method ?? "get",
    data, params
  });
};
export default handleAPI;
