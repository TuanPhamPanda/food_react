import axios from "axios";
import jwt_decode from "jwt-decode";

const user = JSON.parse({} && localStorage.getItem("user"));

const instance = axios.create({
  baseURL: process.env.REACT_APP_FOOD_API + "/api",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: "" && user.accessToken,
  },
});

axios.interceptors.request.use(async (config) => {
  if (user) {
    const decodedToken = jwt_decode(user.accessToken);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: { token: user.accessToken },
    };

    if (decodedToken.exp * 1000 < new Date().getTime()) {
      const accessToken = await fetch(
        `${process.env.REACT_APP_FOOD_API}/refreshToken`,
        requestOptions
      ).then(response => response).catch(error=>console.log(error));
      user.accessToken = accessToken;
      localStorage.setItem("user", user);
    }
    config.headers.Authorization = "Bearer " + user.accessToken;
  }
  return config;
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
