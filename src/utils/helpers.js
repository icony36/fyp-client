import { TICKET_STATUS } from "../constants";

export const ticketStatusToStr = (status) => {
  switch (status) {
    case TICKET_STATUS.pendingStaff:
      return "pending for staff action";
    case TICKET_STATUS.pendingStudent:
      return "pending for student action";
    case TICKET_STATUS.solved:
      return "solved";
    default:
      return status;
  }
};

export const captalizeText = (text) => {
  if (!text) {
    return "-";
  }

  return text?.charAt(0).toUpperCase() + text?.slice(1);
};

export const sortByOldest = (dateA, dateB) => {
  return new Date(dateA) - new Date(dateB);
};

export const sortByNewest = (dateA, dateB) => {
  return new Date(dateB) - new Date(dateA);
};
