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
        sx={{ width: "40ch" }}
        isOptionEqualToValue={(option, value) =>
          option.username === value.username
        }
        getOptionLabel={(option) => option.username}
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
