import { apiCall } from "./api";

export const fetchTrainingData = async () => {
  try {
    const res = await apiCall("get", `/api/training`);

    return res;
  } catch (err) {
    throw err;
  }
};

export const createTrainingData = async (trainingData) => {
  try {
    const res = await apiCall("post", `/api/training/`, trainingData);

    return res;
  } catch (err) {
    throw err;
  }
};

export const updateTrainingData = async (trainingData) => {
  try {
    const res = await apiCall("put", `/api/training`, trainingData);

    return res;
  } catch (err) {
    throw err;
  }
};

export const deleteTrainingData = async () => {
  try {
    const res = await apiCall("delete", `/api/training`);

    return res;
  } catch (err) {
    throw err;
  }
};
