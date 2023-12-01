import { apiCall, setTokenHeader } from "./api";

export const login = async (loginData) => {
  try {
    const res = await apiCall("post", `/api/auth/login`, loginData);

    localStorage.setItem("jwtToken", res.data.token);
    setTokenHeader(res.data.token);
  } catch (err) {
    throw err;
  }
};

export const logout = () => {
  localStorage.clear();
  setTokenHeader(false);
};
