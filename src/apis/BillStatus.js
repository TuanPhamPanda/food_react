import axios from "../axios";

export const showNewestStatusId = () =>
  new Promise(async (resolve, reject) => {
    try {
      const reponse = await axios({
        url: "/billstatus/new",
        method: "get",
      });
      resolve(reponse);
    } catch (error) {
      reject(error);
    }
  });

export const getAllBillsByUser = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const reponse = await axios({
        url: "/billstatus/user/" + id,
        method: "get",
      });
      resolve(reponse);
    } catch (error) {
      reject(error);
    }
  });

export const getAllBillsByBill = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const reponse = await axios({
        url: "/billstatus/bill/" + id,
        method: "get",
      });
      resolve(reponse);
    } catch (error) {
      reject(error);
    }
  });

export const getAllBills = () =>
  new Promise(async (resolve, reject) => {
    try {
      const reponse = await axios({
        url: "/billstatus",
        method: "get",
      });
      resolve(reponse);
    } catch (error) {
      reject(error);
    }
  });

export const updateBillStatus = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const reponse = await axios({
        url: "/billstatus/" + id,
        method: "put",
      });
      resolve(reponse);
    } catch (error) {
      reject(error);
    }
  });

export const updateBillPaid = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const reponse = await axios({
        url: "/billstatus/paid/" + id,
        method: "put",
      });
      resolve(reponse);
    } catch (error) {
      reject(error);
    }
  });

export const cancelBillStatus = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const reponse = await axios({
        url: "/billstatus/cancel/" + id,
        method: "put",
      });
      resolve(reponse);
    } catch (error) {
      reject(error);
    }
  });

export const createBillStatus = (formData) =>
  new Promise(async (resolve, reject) => {
    try {
      const reponse = await axios({
        url: "/billstatus",
        method: "post",
        data: formData,
      });
      resolve(reponse);
    } catch (error) {
      reject(error);
    }
  });
