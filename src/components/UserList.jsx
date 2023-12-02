import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

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

import { fetchUsers, suspendUser } from "../services/user";
import Toast from "./Toast";
import ListActions from "./ListActions";

const header = ["Username", "Name", "Role", ""];

const UsersList = () => {
  const {
    data,
    isLoading: isFetching,
    status,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const [options, setOptions] = useState([]);

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate, isLoading: isSuspending } = useMutation({
    mutationFn: ({ userData, id }) => suspendUser(userData, id),
    onSuccess: (data) => {
      // Invalidate the query to refetch the 'todos' query after successful mutation
      queryClient.invalidateQueries({ queryKey: ["users"] });

      toast.success(data.message);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  useEffect(() => {
    if (status === "success") {
      setOptions(data.data);
    }
  }, [status, data]);

  const handleSuspend = (event, shouldSuspend, id) => {
    event.stopPropagation();

    mutate({ userData: { isSuspended: shouldSuspend }, id });
  };

  const renderRows = () => {
    if (isFetching) {
      return (
        <TableRow>
          <TableCell>Loading...</TableCell>
        </TableRow>
      );
    }

    return (
      <>
        {data.data?.map((row) => (
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
      <Toast />
      <div className="list-page">
        <Container className="container">
          <ListActions
            options={options}
            isLoading={isFetching}
            handleSearchClicked={(id) => navigate(`/users/${id}`)}
            handleButtonClicked={() => navigate("/users/new")}
            searchLabel="Search by username"
            buttonLabel="Create User"
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
