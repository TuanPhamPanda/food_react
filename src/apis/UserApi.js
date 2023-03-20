import axios from "../axios";

export const showUser = (formData) =>
  new Promise(async (resolve, reject) => {
    try {
      const reponse = await axios({
        url: '/users/',
        method: "post",
        data: formData
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
        url: `/users/`,
        data: formData,
        method: "post",
      });
      resolve(reponse);
    } catch (error) {
      reject(error);
    }
  });
