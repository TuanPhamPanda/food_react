import axios from "../axios";

export const showFoods = () =>
  new Promise(async (resolve, reject) => {
    try {
      const reponse = await axios({
        url: "/foods",
        method: "get",
      });
      resolve(reponse);
    } catch (error) {
      reject(error);
    }
  });

export const showFoodById = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const reponse = await axios({
        url: "/foods/" + id,
        method: "get",
      });
      resolve(reponse);
    } catch (error) {
      reject(error);
    }
  });

export const createFood = (formData) =>
  new Promise(async (resolve, reject) => {
    try {
      const reponse = await axios({
        url: "/foods",
        method: "post",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      resolve(reponse);
    } catch (error) {
      reject(error);
    }
  });

export const updateFood = (formData, id) =>
  new Promise(async (resolve, reject) => {
    try {
      const reponse = await axios({
        url: "/foods/" + id,
        method: "put",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      resolve(reponse);
    } catch (error) {
      reject(error);
    }
  });

export const deleteFood = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const reponse = await axios({
        url: "/foods/" + id,
        method: "delete",
      });
      resolve(reponse);
    } catch (error) {
      reject(error);
    }
  });
