export const ROLE = Object.freeze({
  admin: "admin",
  staff: "staff",
  student: "student",
});

export const TICKET_STATUS = Object.freeze({
  pendingStaff: "pending-staff",
  pendingStudent: "pending-student",
  solved: "solved",
});

export const TICKET_TYPE = Object.freeze({
  open: "open",
  close: "close",
});

export const TICKET_PRIORITY = Object.freeze({
  low: "low",
  medium: "medium",
  high: "high",
});

export const SORT_TYPE = Object.freeze({
  earliest: "earliest",
  latest: "latest",
});

export const PASSWORD_VALID_MSG =
  "Password must be at least 8 characters and include at least one special character.";
