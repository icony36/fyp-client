import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import ListActions from "../../components/ListActions";
import { getFullName } from "../../utils/helpers";
import { SORT_DATE, TICKET_PRIORITY, TICKET_TYPE } from "../../constants";
import { List, ListCell, ListRow } from "../../ui/List";
import { ColorChip } from "../../ui/Chip";
import { Button } from "../../ui/Button";
import { Modal } from "../../ui/Modal";
import {
  CardContainer,
  CardContentContainer,
  CardSubtitleContainer,
} from "../../ui/Card";
import { Radio } from "../../ui/Radio";

import { useFetchTickets } from "./useFetchTickets";
import { IconButton } from "@mui/material";

const header = [
  "ID",
  "Reported By",
  "Subject",
  "Prority",
  "Status",
  "Date Created",
];

const priorityOptions = [
  { value: TICKET_PRIORITY.low, label: "Low" },
  { value: TICKET_PRIORITY.medium, label: "Medium" },
  { value: TICKET_PRIORITY.high, label: "High" },
];

const typeOptions = [
  { value: TICKET_TYPE.open, label: "Open" },
  { value: TICKET_TYPE.close, label: "Closed" },
];

const sortOptions = [
  { value: SORT_DATE.earliest, label: "Date (Earliest to Latest)" },
  { value: SORT_DATE.latest, label: "Date (Latest to Earliest)" },
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
  const [openModal, setOpenModal] = useState(false);
  const [sort, setSort] = useState(SORT_DATE.latest);
  const [filter, setFilter] = useState({
    priority: "",
    type: "",
  });

  useEffect(() => {
    if (ticketsStatus === "success") {
      setTickets(rawTickets.data);
      setSearchOptions(rawTickets.data);
    }
  }, [ticketsStatus, rawTickets]);

  const getPriorityOnly = () => {};

  const handleSetFilterPriority = (event) => {
    setFilter((prevState) => ({
      ...prevState,
      priority: event.target.value,
    }));
  };

  const handleSetFilterType = (event) => {
    setFilter((prevState) => ({
      ...prevState,
      type: event.target.value,
    }));
  };

  const handleClearFilter = () => {
    setFilter({
      priority: "",
      type: "",
    });
  };

  const handleSetSort = (event) => {
    setSort(event.target.value);
  };

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
      >
        <IconButton
          sx={{
            color: "var(--color-primary)",
            border: "2px solid var(--color-primary)",
          }}
          onClick={() => setOpenModal(true)}
        >
          <FilterAltOutlinedIcon sx={{ height: "30px", width: "30px" }} />
        </IconButton>
      </ListActions>
      <List
        header={header}
        data={tickets}
        dataStatus={ticketsStatus}
        isFetching={isFetching}
        notFoundMessage="No ticket"
        renderRow={renderRow}
      />

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
          <CardSubtitleContainer>Priority</CardSubtitleContainer>
          <CardContentContainer>
            <Radio
              options={priorityOptions}
              value={filter.priority}
              onChange={handleSetFilterPriority}
            />
          </CardContentContainer>
          <CardSubtitleContainer>Status</CardSubtitleContainer>
          <CardContentContainer>
            <Radio
              options={typeOptions}
              value={filter.type}
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
              <Button simple="true" style={{ color: "var(--color-primary)" }}>
                Save Changes
              </Button>
            </div>
          </CardContentContainer>
        </CardContainer>
      </Modal>
    </>
  );
};

export default TicketList;
