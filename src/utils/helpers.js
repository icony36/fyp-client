import { v4 as uuid } from "uuid";

import { ColorChip } from "../ui/Chip";
import {
  TICKET_STATUS,
  ROLE,
  SORT_TYPE,
  TICKET_PRIORITY,
  TICKET_TYPE,
} from "../constants";

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

export const getProrityChip = (prority) => {
  const str = prority.toUpperCase();

  switch (prority) {
    case TICKET_PRIORITY.high:
      return (
        <ColorChip
          style={{
            backgroundColor: "#F8D2D0",
            color: "#E14942",
          }}
        >
          {str}
        </ColorChip>
      );
    case TICKET_PRIORITY.medium:
      return (
        <ColorChip
          style={{
            backgroundColor: "#F8E8C9",
            color: "#E1A325",
          }}
        >
          {str}
        </ColorChip>
      );
    case TICKET_PRIORITY.low:
      return (
        <ColorChip
          style={{
            backgroundColor: "#CFEBCF",
            color: "#3EAF3F",
          }}
        >
          {str}
        </ColorChip>
      );

    default:
      return <ColorChip>{str}</ColorChip>;
  }
};

export const getTypeChip = (type) => {
  const str = type.toUpperCase();

  switch (type) {
    case TICKET_TYPE.open:
      return (
        <ColorChip
          style={{
            backgroundColor: "#D4E4F1",
            color: "#5193C6",
          }}
        >
          {str}
        </ColorChip>
      );
    case TICKET_TYPE.close:
      return (
        <ColorChip
          style={{
            backgroundColor: "#D8D8D8",
            color: "#636363",
          }}
        >
          {str}
        </ColorChip>
      );

    default:
      return <ColorChip>{str}</ColorChip>;
  }
};

export const keepOnlyAlphanumeric = (str) => {
  return str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
};

export const getUtterResponse = (str) => {
  return `utter_${keepOnlyAlphanumeric(str)}`;
};

export const getStoriesArray = (nodes, edges) => {
  const arr = [];

  nodes.forEach((node) => {
    if (node.type === "startNode") {
      let currentNodeId = node.id;
      let findNextTarget = true;
      const nodeName = node.data.content.nodeName;

      if (!nodeName) {
        return;
      }

      const story = `${nodeName} path`.toLowerCase();
      const steps = [];

      const findEdge = (edge) => {
        return edge.source === currentNodeId;
      };

      while (findNextTarget) {
        const currentEdge = edges.find(findEdge);

        if (currentEdge) {
          const targetNode = nodes.find(
            (node) => node.id === currentEdge.target
          );

          if (targetNode) {
            const obj = {};

            switch (targetNode.data.content.contentType) {
              case "Intent":
                obj.intent = targetNode.data.content.contentValue;
                break;
              case "Response":
                obj.action = getUtterResponse(
                  targetNode.data.content.contentValue
                );
                break;
              default:
                break;
            }

            steps.push(obj);
          }

          currentNodeId = currentEdge.target;
        } else {
          findNextTarget = false;
        }
      }

      arr.push({
        story,
        steps,
      });
    }
  });

  return arr;
};

export const getIntentsArray = (intents) => {
  return intents.map((el) => el.name);
};

export const getIntentsNLU = (intents) => {
  const arr = [];

  intents.forEach((el) => {
    if (!el.name) {
      return;
    }

    const obj = {
      intent: el.name,
      examples: el.examples.map((item) => `- ${item}\n`).join(""),
    };
    arr.push(obj);
  });

  return arr;
};

export const getResponsesObj = (responses) => {
  const obj = {};

  responses.forEach((el) => {
    if (!el.name) {
      return;
    }

    obj[getUtterResponse(el.name)] = el.text.map((txt) => ({
      text: txt,
    }));
  });

  return obj;
};

export const checkIsURL = (str) => {
  var urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // validate protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );

  // validate fragment locator
  return !!urlPattern.test(str);
};
