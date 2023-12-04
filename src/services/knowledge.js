import { apiCall } from "./api";

export const fetchKnowledges = async () => {
  try {
    const res = await apiCall("get", `/api/knowledges`);

    return res;
  } catch (err) {
    throw err;
  }
};

export const fetchKnowledge = async (id) => {
  try {
    const res = await apiCall("get", `/api/knowledges/${id}`);

    return res;
  } catch (err) {
    throw err;
  }
};

export const createKnowledge = async (userData) => {
  try {
    const res = await apiCall("post", `/api/knowledges`, userData);

    return res;
  } catch (err) {
    throw err;
  }
};

export const updateKnowledge = async (userData, id) => {
  try {
    const res = await apiCall("put", `/api/knowledges/${id}`, userData);

    return res;
  } catch (err) {
    throw err;
  }
};

export const deleteKnowledge = async (id) => {
  try {
    const res = await apiCall("delete", `/api/knowledges/${id}`);

    return res;
  } catch (err) {
    throw err;
  }
};
