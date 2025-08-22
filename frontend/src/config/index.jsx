const { default: axios } = require("axios");

export const BASE_URl = "https://pro-connection.onrender.com";
export const clientServer = axios.create({
  baseURL: BASE_URl,
});
