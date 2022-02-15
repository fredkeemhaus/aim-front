import axios from "axios";
import CONST from "../config/const";
import { localGetItem } from "../utils/handleStorage";

const instance = axios.create({
  baseURL: CONST.HOST,
});

instance.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

instance.interceptors.request.use(
  async (response) => {
    const token = await localGetItem("session");

    response.headers.Authorization = "Bearer " + token;
    return response;
  },
  (error) => {
    // go catch()
    return Promise.reject(error);
  }
);

export default instance;
