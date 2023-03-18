import axios from "axios";

export const showUser = (email, password) =>
  new Promise(async (resolve, reject) => {
    try {
      const reponse = await axios({
        url: `/users/${email}/${password}`,
        method: "get",
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
