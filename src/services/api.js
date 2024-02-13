import axios from "axios";

// set axios default request header
export const setTokenHeader = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const apiCall = (method, path, data) => {
  return new Promise((resolve, reject) => {
    return axios[method](
      `${process.env.REACT_APP_API_URL || "http://localhost:3210"}${path}`,
      data
    )
      .then((res) => {
        return resolve(res.data);
      })
      .catch((err) => {
        if (err.response) {
          return reject(err.response.data);
        }

        return reject(err);
      });
  });
};

export const rasaApiCall = (method, path, data) => {
  return new Promise((resolve, reject) => {
    return axios[method](
      `${process.env.REACT_APP_RASA_API || "http://localhost:5005"}${path}`,
      data
    )
      .then((res) => {
        return resolve(res.data);
      })
      .catch((err) => {
        if (err.response) {
          return reject(err.response.data);
        }

        return reject(err);
      });
  });
};

export const rasaYMLCall = (method, path, data) => {
  return new Promise((resolve, reject) => {
    return axios[method](
      `${process.env.REACT_APP_RASA_API || "http://localhost:5005"}${path}`,
      data,
      { headers: { "Content-Type": "application/x-yaml" } }
    )
      .then((res) => {
        return resolve({ data: res.data, headers: res.headers });
      })
      .catch((err) => {
        if (err.response) {
          return reject(err.response.data);
        }

        return reject(err);
      });
  });
};
