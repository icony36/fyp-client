import { apiCall } from "./api";

export const fetchStudentProfiles = async () => {
  try {
    const res = await apiCall("get", `/api/student-profiles`);

    return res;
  } catch (err) {
    throw err;
  }
};

export const fetchStudentProfile = async (id) => {
  try {
    const res = await apiCall("get", `/api/student-profiles/${id}`);

    return res;
  } catch (err) {
    throw err;
  }
};

export const fetchStudentProfileByUser = async (id) => {
  try {
    const res = await apiCall("get", `/api/student-profiles/by-user/${id}`);

    return res;
  } catch (err) {
    throw err;
  }
};

export const createStudentProfile = async (studentData) => {
  try {
    const res = await apiCall("post", `/api/student-profiles/`, studentData);

    return res;
  } catch (err) {
    throw err;
  }
};

export const updateStudentProfile = async (studentData, id) => {
  try {
    const res = await apiCall(
      "put",
      `/api/student-profiles/${id}`,
      studentData
    );

    return res;
  } catch (err) {
    throw err;
  }
};

export const deleteStudentProfile = async (id) => {
  try {
    const res = await apiCall("delete", `/api/student-profiles/${id}`);

    return res;
  } catch (err) {
    throw err;
  }
};

export const deleteStudentProfilesByUser = async (id) => {
  try {
    const res = await apiCall("delete", `/api/student-profiles/by-user/${id}`);

    return res;
  } catch (err) {
    throw err;
  }
};
