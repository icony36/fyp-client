import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { format, formatDistance } from "date-fns";

import {
  Container,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

import { AuthContext } from "../../contexts";
import ListActions from "../../components/ListActions";
import { ticketStatusToStr } from "../../utils/helpers";

import { useFetchTickets } from "./useFetchTickets";

const header = ["Subject", "Type", "Status", "Created At", "Last Update"];

const TicketList = ({ isStudentSession }) => {
  const { auth } = useContext(AuthContext);

  const navigate = useNavigate();

  const { tickets, isFetching, ticketsStatus } = useFetchTickets({
    isStudentSession,
    studentId: isStudentSession ? auth.id : null,
  });

  const [searchOptions, setSearchOptions] = useState([]);

  useEffect(() => {
    if (ticketsStatus === "success") {
      setSearchOptions(tickets.data);
    }
  }, [ticketsStatus, tickets]);

  const renderRows = () => {
    if (isFetching) {
      return (
        <TableRow>
          <TableCell>Loading...</TableCell>
        </TableRow>
      );
    }

    if (
      ticketsStatus === "error" ||
      !tickets ||
      !tickets.data ||
      tickets.data.length < 1
    ) {
      return (
        <TableRow>
          <TableCell>No Ticket</TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
        </TableRow>
      );
    }

    return (
      <>
        {tickets?.data?.map((row, i) => (
          <TableRow
            sx={{ cursor: "pointer" }}
            key={row._id}
            hover
            onClick={() => navigate(`/tickets/${row._id}`)}
          >
            <TableCell
              sx={{
                maxWidth: 200,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {row.subject}
            </TableCell>
            <TableCell>{row.type}</TableCell>
            <TableCell>{ticketStatusToStr(row.status)}</TableCell>
            <TableCell>
              {format(new Date(row.createdAt), "yyyy/MM/dd")}
            </TableCell>
            <TableCell>
              {formatDistance(new Date(row.updatedAt), new Date())}
            </TableCell>
          </TableRow>
        ))}
      </>
    );
  };

  return (
    <>
      <div className="list-page">
        <Container className="container">
          <ListActions
            options={searchOptions}
            isLoading={isFetching}
            handleSearchClicked={(id) => navigate(`/tickets/${id}`)}
            handleButtonClicked={() => navigate("/tickets/new")}
            searchLabel="Search by subject."
            buttonLabel="Create Ticket"
            isOptionEqualToValue={(option, value) =>
              option.subject === value.subject
            }
            getOptionLabel={(option) => option.subject}
            searchBarWidth={isStudentSession ? "60ch" : "80ch"}
            shouldHideButton={!isStudentSession}
          />

          <TableContainer>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  {header.map((header) => (
                    <TableCell sx={{ fontWeight: "bold" }} key={header}>
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>{renderRows()}</TableBody>
            </Table>
          </TableContainer>
        </Container>
      </div>
    </>
  );
};

export default TicketList;
