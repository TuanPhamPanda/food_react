import axios from "../axios";

export const addItems = (formData) =>
  new Promise(async (resolve, reject) => {
    try {
      const reponse = await axios({
        url: "/cartItem",
        method: "post",
        data: formData,
      });
      resolve(reponse);
    } catch (error) {
      reject(error);
    }
  });

export const cartItem = (id_user, food_id) =>
  new Promise(async (resolve, reject) => {
    try {
      const reponse = await axios({
        url: `/cartItem/${id_user}/${food_id}`,
        method: "get",
      });
      resolve(reponse);
    } catch (error) {
      reject(error);
    }
  });

export const allItems = (id_user) =>
  new Promise(async (resolve, reject) => {
    try {
      const reponse = await axios({
        url: `/cartItem/${id_user}`,
        method: "get",
      });
      resolve(reponse);
    } catch (error) {
      reject(error);
    }
  });

export const updateItem = (formData) =>
  new Promise(async (resolve, reject) => {
    try {
      const reponse = await axios({
        url: `/cartItem`,
        method: "put",
        data: formData,
      });
      resolve(reponse);
    } catch (error) {
      reject(error);
    }
  });

export const deleteItem = (user_id, food_id) =>
  new Promise(async (resolve, reject) => {
    try {
      const reponse = await axios({
        url: `/cartItem/${user_id}/${food_id}`,
        method: "delete",
      });
      resolve(reponse);
    } catch (error) {
      reject(error);
    }
  });

export const deleteItems = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const reponse = await axios({
        url: `/cartItem/${id}`,
        method: "delete",
      });
      resolve(reponse);
    } catch (error) {
      reject(error);
    }
  });
