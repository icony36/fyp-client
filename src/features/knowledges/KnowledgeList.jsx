import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format, formatDistance, subDays } from "date-fns";

import {
  Container,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

import ListActions from "../../components/ListActions";
import { useFetchKnowledges } from "./useFetchKnowledges";

const header = ["Title", "Created At", "Last Modified"];

const KnowledgeList = ({ data }) => {
  const navigate = useNavigate();

  const { knowledges, isFetching, knowledgesStatus } = useFetchKnowledges();

  const [searchOptions, setSearchOptions] = useState([]);

  useEffect(() => {
    if (knowledgesStatus === "success") {
      setSearchOptions(knowledges.data);
    }
  }, [knowledgesStatus, knowledges]);

  const renderRows = () => {
    if (isFetching || knowledgesStatus === "error") {
      return (
        <TableRow>
          <TableCell>Loading...</TableCell>
        </TableRow>
      );
    }

    if (!knowledges || !knowledges.data || knowledges.data.length < 1) {
      return (
        <TableRow>
          <TableCell>No knowledge available</TableCell>
        </TableRow>
      );
    }

    return (
      <>
        {knowledges?.data?.map((row, i) => (
          <TableRow
            sx={{ cursor: "pointer" }}
            key={row._id}
            hover
            onClick={() => navigate(`/knowledges/${row._id}`)}
          >
            <TableCell>{row.title}</TableCell>
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
            handleSearchClicked={(id) => navigate(`/knowledges/${id}`)}
            handleButtonClicked={() => navigate("/knowledges/new")}
            searchLabel="Search by title."
            buttonLabel="Create Knowledge"
            isOptionEqualToValue={(option, value) =>
              option.title === value.title
            }
            getOptionLabel={(option) => option.title}
            searchBarWidth="60ch"
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

export default KnowledgeList;
