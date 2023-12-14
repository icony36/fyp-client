import { apiCall } from "./api";

export const fetchTickets = async () => {
  try {
    const res = await apiCall("get", `/api/tickets`);

    return res;
  } catch (err) {
    throw err;
  }
};

export const fetchTicket = async (id) => {
  try {
    const res = await apiCall("get", `/api/tickets/${id}`);

    return res;
  } catch (err) {
    throw err;
  }
};

export const fetchTicketByUser = async (id) => {
  try {
    const res = await apiCall("get", `/api/tickets/by-user/${id}`);

    return res;
  } catch (err) {
    throw err;
  }
};

export const createTicket = async (ticketData) => {
  try {
    const res = await apiCall("post", `/api/tickets`, ticketData);

    return res;
  } catch (err) {
    throw err;
  }
};

export const updateTicket = async (ticketData, id) => {
  try {
    const res = await apiCall("put", `/api/tickets/${id}`, ticketData);

    return res;
  } catch (err) {
    throw err;
  }
};

export const deleteTicket = async (id) => {
  try {
    const res = await apiCall("delete", `/api/tickets/${id}`);

    return res;
  } catch (err) {
    throw err;
  }
};
