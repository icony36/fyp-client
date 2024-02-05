import React from "react";
import {
  Autocomplete,
  TextField,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = (props) => {
  const { sx, ...remainingProps } = props;

  return (
    <>
      <Autocomplete
        sx={{
          ...sx,
          "& .MuiOutlinedInput-root": {
            backgroundColor: "white",
            paddingRight: "8px !important",
            padding: "8px",
            height: "48px",
            width: "240px",
            border: "2px solid black",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },

          "& .MuiAutocomplete-input": {
            height: "100%",
            padding: "0 0 0 4px !important",
            lineHeight: "40px",
            verticalAlign: "middle",
          },

          "& fieldset": { border: "none" },
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            margin="none"
            placeholder={"Search"}
            InputLabelProps={{ shrink: false }}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon
                    sx={{ height: "40px", width: "40px", color: "black" }}
                  />
                </InputAdornment>
              ),
            }}
          />
        )}
        {...remainingProps}
      />
    </>
  );
};

export default SearchBar;
