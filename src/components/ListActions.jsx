import React from "react";
import { toast } from "react-hot-toast";

import styled from "styled-components";
import { Heading } from "../ui/Typography";
import SearchBar from "../ui/SearchBar";
import { Button } from "../ui/Button";
import { HeadingContainer } from "../ui/HeadingContainer";

const ActionArea = styled.div`
  display: flex;
  flex-direction: row;
`;

const ListActions = ({
  title,
  options,
  isLoading,
  searchKey,
  handleSearchClicked,
  handleButtonClicked,
  buttonLabel,
  isOptionEqualToValue,
  getOptionLabel,
  shouldHideButton,
  children,
}) => {
  const onChange = (event, value) => {
    if (!value) {
      toast.error("No value from search.");
      return;
    }

    const id = options.find(
      (option) => option[searchKey] === value[searchKey]
    )?._id;

    handleSearchClicked(id);
  };

  return (
    <HeadingContainer>
      <Heading as="h1">{title}</Heading>
      <ActionArea>
        <SearchBar
          isOptionEqualToValue={isOptionEqualToValue}
          getOptionLabel={getOptionLabel}
          options={options}
          loading={isLoading}
          onChange={onChange}
          sx={{ marginRight: "16px" }}
        />

        {shouldHideButton ? (
          <></>
        ) : (
          <Button condensed="true" primary="true" onClick={handleButtonClicked}>
            {buttonLabel}
          </Button>
        )}

        {children}
      </ActionArea>
    </HeadingContainer>
  );
};

export default ListActions;
