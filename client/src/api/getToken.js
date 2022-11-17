import axios from "../utils/axios";

export const getToken = async (data) => {
  try {
    const response = await axios.post("jwt", data);
    localStorage.setItem("authToken", response.data.token);
    return response.data.token;
  } catch (error) {
    return false;
  }
};
