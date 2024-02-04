import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

import { useFetchUsers } from "./useFetchUsers";
import { useSuspendUser } from "./useSuspendUser";
import ListActions from "../../components/ListActions";
import { List, ListRow, ListCell } from "../../ui/List";
import { Button } from "../../ui/Button";
import { ProfileImage } from "../../ui/ProfileImage";
import {
  getActiveFromSuspend,
  getNameInitial,
  getFullName,
  roleToName,
} from "../../utils/helpers";

const header = ["User", "Role", "Status", "Action"];

const ProfileArea = styled.div`
  display: flex;
`;

const SuspendIcon = styled.div`
  border-radius: 50%;
  height: 16px;
  width: 16px;
  margin-right: 12px;
  background-color: var(--color-green);

  ${({ isSuspended }) =>
    isSuspended &&
    css`
      background-color: var(--color-red);
    `}
`;

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

  const getSuspendCell = (isSuspended) => {
    const str = getActiveFromSuspend(isSuspended)?.toUpperCase();

    return (
      <div style={{ display: "flex" }}>
        <SuspendIcon isSuspended={isSuspended} />
        {str}
      </div>
    );
  };

  const renderRow = (el) => {
    return (
      <ListRow key={el._id}>
        <ListCell>
          <ProfileArea>
            <ProfileImage primary>
              {getNameInitial(getFullName(el.firstName, el.lastName))}
            </ProfileImage>
            <div>
              <div style={{ fontSize: "17px" }}>
                {getFullName(el.firstName, el.lastName)}
              </div>
              <div style={{ fontWeight: "500" }}>{el.username}</div>
            </div>
          </ProfileArea>
        </ListCell>
        <ListCell>{roleToName(el.role)?.toUpperCase()}</ListCell>
        <ListCell>{getSuspendCell(el.isSuspended)}</ListCell>
        <ListCell>
          <div>
            <Button
              small
              condensed
              outlined
              onClick={() => navigate(`/users/${el._id}`)}
              style={{ marginRight: "8px" }}
            >
              View
            </Button>
            {el.isSuspended ? (
              <Button
                small
                condensed
                outlined
                disabled={isSuspending}
                onClick={(e) => handleSuspend(e, false, el._id)}
              >
                Unsuspend
              </Button>
            ) : (
              <Button
                small
                condensed
                outlined
                disabled={isSuspending}
                onClick={(e) => handleSuspend(e, true, el._id)}
              >
                Suspend
              </Button>
            )}
          </div>
        </ListCell>
      </ListRow>
    );
  };

  return (
    <>
      <ListActions
        title="Users"
        options={searchOptions}
        isLoading={isFetching}
        handleSearchClicked={(id) => navigate(`/users/${id}`)}
        handleButtonClicked={() => navigate("/users/new")}
        buttonLabel="Create User"
        isOptionEqualToValue={(option, value) =>
          option.username === value.username
        }
        getOptionLabel={(option) => option.username}
      />

      <List
        header={header}
        data={users?.data}
        dataStatus={usersStatus}
        isFetching={isFetching}
        notFoundMessage="No user available"
        renderRow={renderRow}
      />
    </>
  );
};

export default UsersList;
