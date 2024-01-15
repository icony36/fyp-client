import { v4 as uuid } from "uuid";

import { TICKET_STATUS } from "../constants";

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
