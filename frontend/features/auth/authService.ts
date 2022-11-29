import axios from "axios"; //making the HTTP request and waiting for response

const API_URL = "http://localhost:5000/api/users/";

//Register
const register = async (userData: any) => {
  const response = await axios.post(API_URL, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

//LogOut
const logout = () => {
  localStorage.removeItem("user");
};

const login = async (userData: any) => {
  const response = await axios.post(API_URL + "login", userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
