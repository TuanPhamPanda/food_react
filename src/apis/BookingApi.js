import axios from "../axios";

export const createBooking = (formData) =>
  new Promise(async (resolve, reject) => {
    try {
      const reponse = await axios({
        url: "/booking",
        method: "post",
        data: formData,
      });
      resolve(reponse);
    } catch (error) {
      reject(error);
    }
  });
