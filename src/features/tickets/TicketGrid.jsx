import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

import { Grid } from "@mui/material";

import { AuthContext } from "../../contexts";
import ListActions from "../../components/ListActions";
import { ColorChip } from "../../ui/Chip";

import { useFetchTickets } from "./useFetchTickets";
import {
  CardContainer,
  CardContentContainer,
  CardSubtitleContainer,
  CardTitleContainer,
} from "../../ui/Card";
import { Heading } from "../../ui/Typography";
import { ticketStatusToName } from "../../utils/helpers";

const TicketGrid = () => {
  const { auth } = useContext(AuthContext);

  const navigate = useNavigate();

  const { tickets, isFetching, ticketsStatus } = useFetchTickets({
    isStudentSession: true,
    studentId: auth.id,
  });

  const [searchOptions, setSearchOptions] = useState([]);

  useEffect(() => {
    if (ticketsStatus === "success") {
      setSearchOptions(tickets.data);
    }
  }, [ticketsStatus, tickets]);

  const getStatusChip = (status) => {
    const statusName = ticketStatusToName(status, auth.role);
    const str = statusName.toUpperCase();

    switch (statusName) {
      case "Pending Reply":
        return (
          <ColorChip
            style={{
              backgroundColor: "#F8E8C9",
              color: "#E1A325",
              width: "max-content",
              padding: "4px 12px",
              margin: "0",
            }}
          >
            {str}
          </ColorChip>
        );
      case "New Reply":
        return (
          <ColorChip
            style={{
              backgroundColor: "#F8D2D0",
              color: "#E14942",
              width: "max-content",
              padding: "4px 12px",
              margin: "0",
            }}
          >
            {str}
          </ColorChip>
        );
      case "Completed":
        return (
          <ColorChip
            style={{
              backgroundColor: "#CFEBCF",
              color: "#3EAF3F",
              width: "max-content",
              padding: "4px 12px",
              margin: "0",
            }}
          >
            {str}
          </ColorChip>
        );
      default:
        return <ColorChip>{str}</ColorChip>;
    }
  };

  const renderItems = () => {
    return tickets?.data?.map((el, index) => {
      return (
        <>
          <Grid item xs={6} key={index}>
            <CardContainer
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/tickets/${el._id}`)}
            >
              <CardTitleContainer
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                {`Ticket ${el._id}`}

                {getStatusChip(el.status)}
              </CardTitleContainer>
              <CardSubtitleContainer>Date Created</CardSubtitleContainer>
              <CardContentContainer>
                <Heading as="h3" style={{ fontWeight: "600" }}>
                  {format(new Date(el.createdAt), "dd MMM yyyy").toUpperCase()}
                </Heading>
              </CardContentContainer>

              <CardSubtitleContainer>Ticket Details</CardSubtitleContainer>
              <CardContentContainer>
                <Heading as="h2">{el.subject}</Heading>
                <Heading as="h3">{el.detail}</Heading>
              </CardContentContainer>
            </CardContainer>
          </Grid>
        </>
      );
    });
  };

  return (
    <>
      <ListActions
        options={searchOptions}
        isLoading={isFetching}
        handleSearchClicked={(id) => navigate(`/tickets/${id}`)}
        handleButtonClicked={() => navigate("/tickets/new")}
        isOptionEqualToValue={(option, value) =>
          option.subject === value.subject
        }
        getOptionLabel={(option) => option.subject}
        buttonLabel="Create Ticket"
        title="My Tickets"
      ></ListActions>

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
        {renderItems()}
      </Grid>
    </>
  );
};

export default TicketGrid;
