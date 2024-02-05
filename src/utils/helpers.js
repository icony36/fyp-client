import { v4 as uuid } from "uuid";

import { TICKET_STATUS, ROLE, SORT_TYPE } from "../constants";

export const getNodeId = () => {
  const timestamp = Date.now().toString(36);

  const unique_id = uuid().slice(0, 8);

  return `N${timestamp}.${unique_id}`;
};

export const getNewNode = (type, position, data) => {
  return {
    id: getNodeId(),
    type,
    position,
    data,
    origin: [0.5, 0.0],
  };
};

export const getEdgeId = (sourceId, targetId) => {
  return `E-${sourceId}-${targetId}`;
};

export const getNewEdge = (sourceId, targetId) => {
  return {
    id: getEdgeId(sourceId, targetId),
    type: "step",
    source: sourceId,
    target: targetId,
    animated: true,
  };
};

export const getFlowMenuPosition = (event, menuRef) => {
  const pane = menuRef.current.getBoundingClientRect();

  const x = event.clientX - pane.left;
  const y = event.clientY - pane.top;

  return {
    top: y < pane.height - 200 && y,
    left: x < pane.width - 200 && x,
    right: x >= pane.width - 200 && pane.width - x,
    bottom: y >= pane.height - 200 && pane.height - y,
  };
};

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

export const roleToName = (role) => {
  switch (role) {
    case ROLE.admin:
      return "System Admin";
    case ROLE.staff:
      return "Staff";
    case ROLE.student:
      return "Student";
    default:
      return "";
  }
};

export const ticketStatusToName = (status, role) => {
  switch (status) {
    case TICKET_STATUS.pendingStaff:
      if (role === ROLE.student) {
        return "Pending Reply";
      }

      return "New Reply";
    case TICKET_STATUS.pendingStudent:
      if (role === ROLE.student) {
        return "New Reply";
      }

      return "Pending Reply";
    case TICKET_STATUS.solved:
      return "Completed";
    default:
      return "";
  }
};

export const getFullName = (firstName, lastName) => {
  if (!firstName || !lastName) {
    return "Unknown";
  }

  return `${firstName} ${lastName}`;
};

export const getNameInitial = (str) => {
  return str
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

export const getActiveFromSuspend = (isSuspended) => {
  return isSuspended ? "Suspended" : "Active";
};

export const getCapitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const compareName = (firstName1, firstName2, lastName1, lastName2) => {
  return firstName1 === firstName2 && lastName1 === lastName2;
};

export const getSortedDataByDate = (arr, sortType) => {
  const newArr = [...arr];

  switch (sortType) {
    case SORT_TYPE.earliest:
      newArr.sort((a, b) => sortByOldest(a.createdAt, b.createdAt));
      break;
    case SORT_TYPE.latest:
      newArr.sort((a, b) => sortByNewest(a.createdAt, b.createdAt));
      break;
    default:
      newArr.sort((a, b) => sortByNewest(a.createdAt, b.createdAt));
  }

  return newArr;
};

export const sortOptions = [
  { value: SORT_TYPE.earliest, label: "Date (Earliest to Latest)" },
  { value: SORT_TYPE.latest, label: "Date (Latest to Earliest)" },
];
