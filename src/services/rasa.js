import { rasaApiCall } from "./api";

export const sendMessage = async (data) => {
  try {
    const res = await rasaApiCall("post", `/webhooks/rest/webhook`, data);

    return res;
  } catch (err) {
    throw err;
  }
};
