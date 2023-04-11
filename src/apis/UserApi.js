import axios from "../axios";

export const showUser = (formData) =>
  new Promise(async (resolve, reject) => {
    try {
      const reponse = await axios({
        url: "/login",
        method: "post",
        data: formData,
      });
      resolve(reponse);
    } catch (error) {
      reject(error);
    }
  });

export const createAccount = (formData) =>
  new Promise(async (resolve, reject) => {
    try {
      const reponse = await axios({
        url: `/register`,
        data: formData,
        method: "post",
      });
      resolve(reponse);
    } catch (error) {
      reject(error);
    }
  });

export const logoutAccount = (formData) =>
  new Promise(async (resolve, reject) => {
    try {
      const reponse = await axios({
        url: `/logout`,
        data: formData,
        method: "post",
      });
      resolve(reponse);
    } catch (error) {
      reject(error);
    }
  });

export const refreshToken = (formData) =>
  new Promise(async (resolve, reject) => {
    try {
      const reponse = await axios({
        url: `/refreshToen`,
        data: formData,
        method: "post",
      });
      resolve(reponse);
    } catch (error) {
      reject(error);
    }
  });
