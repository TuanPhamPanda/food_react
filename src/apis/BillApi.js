import axios from "../axios";

export const createBillDetails = (formData) =>
  new Promise(async (resolve, reject) => {
    try {
      const reponse = await axios({
        url: "/billdetails",
        method: "post",
        data: formData,
      });
      resolve(reponse);
    } catch (error) {
      reject(error);
    }
  });

export const getBillDetailsById = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const reponse = await axios({
        url: "/billdetails" + id,
        method: "get",
      });
      resolve(reponse);
    } catch (error) {
      reject(error);
    }
  });
