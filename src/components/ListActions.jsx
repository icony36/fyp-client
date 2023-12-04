import React from "react";
import { toast } from "react-hot-toast";

import { Toolbar, Autocomplete, TextField, Button } from "@mui/material";

const ListActions = ({
  options,
  isLoading,
  searchKey,
  handleSearchClicked,
  handleButtonClicked,
  searchLabel,
  buttonLabel,
  isOptionEqualToValue,
  getOptionLabel,
  searchBarWidth = "40ch",
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
    <Toolbar
      sx={{ justifyContent: "space-between", margin: "32px 0" }}
      disableGutters
    >
      <Autocomplete
        sx={{ width: searchBarWidth }}
        isOptionEqualToValue={isOptionEqualToValue}
        getOptionLabel={getOptionLabel}
        options={options}
        loading={isLoading}
        renderInput={(params) => <TextField {...params} label={searchLabel} />}
        onChange={onChange}
      />

      <Button sx={{ m: 4 }} variant="contained" onClick={handleButtonClicked}>
        {buttonLabel}
      </Button>
    </Toolbar>
  );
};

export default ListActions;
