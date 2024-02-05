import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

import ListActions from "../../components/ListActions";
import { getFullName } from "../../utils/helpers";
import { TICKET_PRIORITY, TICKET_TYPE } from "../../constants";
import { List, ListCell, ListRow } from "../../ui/List";
import { ColorChip } from "../../ui/Chip";

import { useFetchTickets } from "./useFetchTickets";

const header = [
  "ID",
  "Reported By",
  "Subject",
  "Prority",
  "Status",
  "Date Created",
];

const TicketList = () => {
  const navigate = useNavigate();

  const {
    tickets: rawTickets,
    isFetching,
    ticketsStatus,
  } = useFetchTickets({});

  const [tickets, setTickets] = useState([]);
  const [searchOptions, setSearchOptions] = useState([]);

  useEffect(() => {
    if (ticketsStatus === "success") {
      // const newTickets = setPriority(rawTickets.data);

      setTickets(rawTickets.data);
      setSearchOptions(rawTickets.data);
    }
  }, [ticketsStatus, rawTickets]);

  // const setPriority = (tickets) => {
  //   return tickets.map((el) => {
  //     const timeDiff = new Date().getTime() - new Date(el.updatedAt).getTime();

  //     const dayDiff = Math.round(timeDiff / (1000 * 3600 * 24));

  //     if (dayDiff >= 14) {
  //       el.priority = TICKET_PRIORITY.high;
  //     } else if (dayDiff >= 7 && dayDiff < 14) {
  //       el.priority = TICKET_PRIORITY.medium;
  //     } else {
  //       el.priority = TICKET_PRIORITY.low;
  //     }

  //     return el;
  //   });
  // };

  const getProrityChip = (prority) => {
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

  const getTypeChip = (type) => {
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

  const renderRow = (el) => {
    return (
      <ListRow
        sx={{ cursor: "pointer" }}
        key={el._id}
        hover
        onClick={() => navigate(`/tickets/${el._id}`)}
      >
        <ListCell>{el._id}</ListCell>
        <ListCell>
          {getFullName(el?.studentId.firstName, el?.studentId.lastName)}
        </ListCell>
        <ListCell
          sx={{
            maxWidth: 200,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {el.subject}
        </ListCell>
        <ListCell sx={{ textAlign: "center" }}>
          {getProrityChip(el.priority)}
        </ListCell>
        <ListCell sx={{ textAlign: "center" }}>{getTypeChip(el.type)}</ListCell>
        <ListCell>{format(new Date(el.createdAt), "dd/MM/yyyy")}</ListCell>
      </ListRow>
    );
  };

  return (
    <>
      <ListActions
        options={searchOptions}
        isLoading={isFetching}
        handleSearchClicked={(id) => navigate(`/tickets/${id}`)}
        isOptionEqualToValue={(option, value) =>
          option.subject === value.subject
        }
        getOptionLabel={(option) => option.subject}
        shouldHideButton
        title="Tickets"
      />
      <List
        header={header}
        data={tickets}
        dataStatus={ticketsStatus}
        isFetching={isFetching}
        notFoundMessage="No ticket"
        renderRow={renderRow}
      />
    </>
  );
};

export default TicketList;
