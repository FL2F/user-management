// Service is used for http requests, retreiving the data
import { toast } from "react-toastify";
import axios from "axios";

// const API_URL = "http://localhost:8080/api/";
const API_URL = "https://user-management-backend-3yvuhaorjq-uc.a.run.app/api/";

// axios.defaults.withCredentials = true;

// Login User
const login = async (userData) => {
  try {
    const { data } = await axios.post(API_URL + "login", userData);
    if (data.username) {
      localStorage.setItem("user", JSON.stringify(data));
    }
    return data;
  } catch (error) {
    console.log("error from AuthService: ", error);
    toast.error("Invalid Credentials");
    return error;
  }
};

//logout CHANGE THIS TO HTTP ONLY COOKIE
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  login,
  logout,
};

export default authService;
