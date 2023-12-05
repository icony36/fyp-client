import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Container,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

import { useFetchUsers } from "./useFetchUsers";
import { useSuspendUser } from "./useSuspendUser";
import ListActions from "../../components/ListActions";

const header = ["Username", "Name", "Role", ""];

const UsersList = () => {
  const navigate = useNavigate();

  const { users, isFetching, usersStatus } = useFetchUsers();
  const { suspendUser, isSuspending } = useSuspendUser();

  const [searchOptions, setSearchOptions] = useState([]);

  useEffect(() => {
    if (usersStatus === "success") {
      setSearchOptions(users.data);
    }
  }, [usersStatus, users]);

  const handleSuspend = (event, shouldSuspend, id) => {
    event.stopPropagation();

    suspendUser({ userData: { isSuspended: shouldSuspend }, id });
  };

  const renderRows = () => {
    if (isFetching || usersStatus === "error") {
      return (
        <TableRow>
          <TableCell>Loading...</TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
        </TableRow>
      );
    }

    if (!users || !users.data || users.data.length < 1) {
      return (
        <TableRow>
          <TableCell>No user available</TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
        </TableRow>
      );
    }

    return (
      <>
        {users.data?.map((row) => (
          <TableRow
            sx={{ cursor: "pointer" }}
            key={row._id}
            hover
            onClick={() => navigate(`/users/${row._id}`)}
          >
            <TableCell>{row.username}</TableCell>
            <TableCell>{`${row.firstName} ${row.lastName}`}</TableCell>
            <TableCell>{row.role?.toUpperCase()}</TableCell>
            <TableCell style={{ textAlign: "center" }}>
              {row.isSuspended ? (
                <Button
                  sx={{ width: "15ch" }}
                  size="small"
                  variant="contained"
                  disabled={isSuspending}
                  onClick={(e) => handleSuspend(e, false, row._id)}
                >
                  Unsuspend
                </Button>
              ) : (
                <Button
                  sx={{ width: "15ch" }}
                  size="small"
                  color="secondary"
                  variant="contained"
                  disabled={isSuspending}
                  onClick={(e) => handleSuspend(e, true, row._id)}
                >
                  Suspend
                </Button>
              )}
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
            handleSearchClicked={(id) => navigate(`/users/${id}`)}
            handleButtonClicked={() => navigate("/users/new")}
            searchLabel="Search by username"
            buttonLabel="Create User"
            isOptionEqualToValue={(option, value) =>
              option.username === value.username
            }
            getOptionLabel={(option) => option.username}
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

export default UsersList;
