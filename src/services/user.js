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

export const updateUser = async (userData, id) => {
  try {
    const res = await apiCall("put", `/api/users/${id}`, userData);

    return res;
  } catch (err) {
    throw err;
  }
};

export const updateProfile = async (userData, id) => {
  try {
    const res = await apiCall("put", `/api/users/profile/${id}`, userData);

    return res;
  } catch (err) {
    throw err;
  }
};

export const suspendUser = async (userData, id) => {
  try {
    const res = await apiCall("patch", `/api/users/${id}`, userData);

    return res;
  } catch (err) {
    throw err;
  }
};

export const deleteUser = async (id) => {
  try {
    const res = await apiCall("delete", `/api/users/${id}`);

    return res;
  } catch (err) {
    throw err;
  }
};
