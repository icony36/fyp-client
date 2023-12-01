import { apiCall } from "./api";

export const fetchUsers = async () => {
  try {
    const res = await apiCall("get", `/api/users`);

    return res;
  } catch (err) {
    throw err;
  }
};

export const fetchUser = async (id) => {
  try {
    const res = await apiCall("get", `/api/users/${id}`);

    return res;
  } catch (err) {
    throw err;
  }
};

export const createUser = async (userData) => {
  try {
    const res = await apiCall("post", `/api/auth/signup`, userData);

    return res;
  } catch (err) {
    throw err;
  }
};

export const updateUser = async (id, userData) => {
  try {
    const res = await apiCall("post", `/api/users/${id}`, userData);

    return res;
  } catch (err) {
    throw err;
  }
};
