import React from "react";

import {
  Paper,
  Box,
  Button,
  FormControl,
  TextField,
  IconButton,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

const IntentForm = ({
  formData,
  setFormData,
  initData,
  valueName,
  keyLabel,
  valueLabel,
  addNewGroupLabel,
  addNewValueLabel,
}) => {
  const handleAddKey = () => {
    setFormData((prevState) => [...prevState, initData]);
  };

  const handleRemoveKey = (index) => {
    const arr = [...formData];
    arr.splice(index, 1);

    setFormData(arr);
  };

  const handleKeyChange = (event, index) => {
    const arr = [...formData];
    arr[index].name = event.target.value;

    setFormData(arr);
  };

  const handleAddValue = (index) => {
    const arr = [...formData];
    arr[index][valueName].push("");

    setFormData(arr);
  };

  const handleRemoveValue = (index, valueIndex) => {
    if (valueIndex === 0) return;

    const arr = [...formData];
    arr[index][valueName].splice(valueIndex, 1);

    setFormData(arr);
  };

  const handleValueChange = (event, index, valueIndex) => {
    const arr = [...formData];
    arr[index][valueName][valueIndex] = event.target.value;

    setFormData(arr);
  };

  const renderGroup = (el, index) => {
    return (
      <Box key={index} sx={{ marginBottom: "16px" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            padding: "24px 48px",
            backgroundColor: "#ebf7fd",
          }}
        >
          <Box sx={{ marginRight: "8px" }}>
            <FormControl sx={{ display: "flex", flexDirection: "row" }}>
              <IconButton onClick={() => handleRemoveKey(index)}>
                <RemoveCircleIcon />
              </IconButton>
              <TextField
                label={keyLabel}
                variant="outlined"
                value={el.name}
                onChange={(e) => handleKeyChange(e, index)}
              />
            </FormControl>
          </Box>

          <Box>
            {el[valueName]?.map((value, valueIndex) => (
              <Box key={valueIndex} sx={{ marginBottom: "16px" }}>
                <div
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "stretch",
                  }}
                >
                  <FormControl sx={{ width: "60ch" }}>
                    <TextField
                      label={valueLabel}
                      variant="outlined"
                      value={value}
                      onChange={(e) => handleValueChange(e, index, valueIndex)}
                    />
                  </FormControl>

                  <FormControl
                    style={{
                      width: "5ch",
                      height: "56px",
                      alignSelf: "stretch",
                    }}
                  >
                    {valueIndex !== 0 && (
                      <IconButton
                        sx={{ margin: "auto" }}
                        onClick={() => handleRemoveValue(index, valueIndex)}
                      >
                        <RemoveCircleIcon />
                      </IconButton>
                    )}
                  </FormControl>
                </div>
              </Box>
            ))}
            <Box>
              <Button
                variant="outlined"
                endIcon={<AddCircleIcon />}
                onClick={() => handleAddValue(index)}
              >
                {addNewValueLabel}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <>
      <Paper
        sx={{ marginTop: "24px", padding: "24px 48px", minHeight: "500px" }}
      >
        {formData.map((el, index) => renderGroup(el, index))}
        <Button
          sx={{ marginTop: "16px" }}
          variant="outlined"
          endIcon={<AddCircleIcon />}
          onClick={handleAddKey}
        >
          {addNewGroupLabel}
        </Button>
      </Paper>
    </>
  );
};

export default IntentForm;
