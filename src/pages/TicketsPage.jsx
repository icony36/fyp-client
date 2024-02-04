import React, { useContext } from "react";

import { AuthContext } from "../contexts";
import TicketList from "../features/tickets/TicketList";
import { ROLE } from "../constants";
import TicketGrid from "../features/tickets/TicketGrid";

const TicketsPage = () => {
  const { auth } = useContext(AuthContext);

  return <>{auth.role === ROLE.student ? <TicketGrid /> : <TicketList />}</>;
};

export default TicketsPage;
