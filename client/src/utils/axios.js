import axios from "axios";

const token = localStorage.getItem("authToken");

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: { Authorization: "Bearer " + token },
});

export default axiosInstance;
