import axios from "axios";
import URL from "../global/config";
import * as session from "../utils/session";
import history from "../history";
import showNotification from "../services/notificationService";

export const http = axios.create({
  baseURL: URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "multipart/form-data",
  },
});

http.interceptors.request.use(
  function (config) {
    const token = session.getSession();
    if (token) config.headers.Authorization = "Bearer " + token;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response) {
      if (400 === error.response.status) {
        showNotification("danger", error.response.data.message);
      }
      if (401 === error.response.status) {
        session.clearSession();
        history.push("/");
      }
    }
    return Promise.reject(error);
  }
);
