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
import { Button, FilterButton } from "../../ui/Button";
import { Modal } from "../../ui/Modal";
import { Radio } from "../../ui/Radio";
import { Heading } from "../../ui/Typography";
import {
  ticketStatusToName,
  sortOptions,
  getSortedDataByDate,
} from "../../utils/helpers";
import { SORT_TYPE, TICKET_STATUS } from "../../constants";

const statusOptions = [
  { value: TICKET_STATUS.pendingStaff, label: "Pending Reply" },
  { value: TICKET_STATUS.pendingStudent, label: "New Reply" },
  { value: TICKET_STATUS.solved, label: "Completed" },
];

const TicketGrid = () => {
  const { auth } = useContext(AuthContext);

  const navigate = useNavigate();

  const {
    tickets: rawTickets,
    isFetching,
    ticketsStatus,
  } = useFetchTickets({
    isStudentSession: true,
    studentId: auth.id,
  });

  const [tickets, setTickets] = useState([]);
  const [searchOptions, setSearchOptions] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [sort, setSort] = useState(SORT_TYPE.latest);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (ticketsStatus === "success") {
      const arr = getSortedDataByDate(rawTickets.data, SORT_TYPE.latest);

      setTickets(arr);
      setSearchOptions(arr);
    }
  }, [ticketsStatus, rawTickets]);

  const handleSaveFilter = () => {
    let arr = [...rawTickets.data];

    arr = applyFilter(arr);
    arr = getSortedDataByDate(arr, sort);

    setTickets(arr);

    setOpenModal(false);
  };

  const applyFilter = (arr) => {
    let newArr = [...arr];

    switch (filter) {
      case TICKET_STATUS.pendingStaff:
        newArr = arr.filter((el) => el.status === TICKET_STATUS.pendingStaff);
        break;
      case TICKET_STATUS.pendingStudent:
        newArr = arr.filter((el) => el.status === TICKET_STATUS.pendingStudent);
        break;
      case TICKET_STATUS.solved:
        newArr = arr.filter((el) => el.status === TICKET_STATUS.solved);
        break;
      default:
        break;
    }

    return newArr;
  };

  const handleSetSort = (event) => {
    setSort(event.target.value);
  };

  const handleSetFilterType = (event) => {
    setFilter(event.target.value);
  };

  const handleClearFilter = () => {
    setFilter("");
    setSort(SORT_TYPE.latest);
  };

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
    if (tickets.length < 1) {
      return (
        <div
          style={{
            fontFamily: "Playfair Display",
            fontWeight: "600",
            fontSize: "21px",
            padding: "20px",
          }}
        >
          No ticket
        </div>
      );
    }

    return tickets?.map((el, index) => {
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
      >
        <FilterButton
          style={{ marginLeft: "16px" }}
          onClick={() => setOpenModal(true)}
        />
      </ListActions>

      <Grid container rowSpacing={0.5} columnSpacing={2}>
        {renderItems()}
      </Grid>

      <Modal openModal={openModal}>
        <CardContainer style={{ margin: 0, height: "100%", minWidth: "780px" }}>
          <CardSubtitleContainer>Sort By</CardSubtitleContainer>
          <CardContentContainer>
            <Radio
              options={sortOptions}
              value={sort}
              onChange={handleSetSort}
            />
          </CardContentContainer>
          <CardSubtitleContainer>Status</CardSubtitleContainer>
          <CardContentContainer>
            <Radio
              options={statusOptions}
              value={filter}
              onChange={handleSetFilterType}
            />
          </CardContentContainer>
          <CardContentContainer
            style={{
              display: "flex",
              borderTop: "2px solid var(--color-light-grey)",
            }}
          >
            <div
              style={{
                flex: 1,
              }}
            >
              <Button
                simple="true"
                style={{ color: "var(--color-red)" }}
                onClick={handleClearFilter}
              >
                Clear All Filters
              </Button>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button simple="true" onClick={() => setOpenModal(false)}>
                Cancel
              </Button>
              <Button
                simple="true"
                style={{ color: "var(--color-primary)" }}
                onClick={handleSaveFilter}
              >
                Apply
              </Button>
            </div>
          </CardContentContainer>
        </CardContainer>
      </Modal>
    </>
  );
};

export default TicketGrid;
