import React from "react";

import { IconButton } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

import { Button } from "../../ui/Button";
import { RawInput, InputLabel } from "../../ui/Input";

const RemoveButton = ({ onClick }) => {
  return (
    <>
      <IconButton
        sx={{
          color: "var(--color-primary)",
          height: "30px",
          width: "30px",
          padding: "0",
        }}
        onClick={onClick}
      >
        <RemoveCircleIcon sx={{ height: "30px", width: "30px" }} />
      </IconButton>
    </>
  );
};

const IntentForm = ({
  formData,
  setFormData,
  initData,
  valueName,
  keyLabel,
  keyPlaceholder,
  valueLabel,
  valuePlaceholder,
  addNewGroupLabel,
  addNewValueLabel,
  isWorking,
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
      <div key={index} style={{ marginBottom: "10px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            padding: "10px 20px",
            backgroundColor: "white",
            borderRadius: "10px",
          }}
        >
          <div style={{ flex: 1, marginRight: "10px" }}>
            <InputLabel style={{ marginLeft: "30px" }}>{keyLabel}</InputLabel>

            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ marginRight: "10px" }}>
                <RemoveButton onClick={() => handleRemoveKey(index)} />
              </div>
              <RawInput
                key={index}
                style={{ flex: 1 }}
                placeholder={keyPlaceholder}
                value={el.name}
                onChange={(e) => handleKeyChange(e, index)}
              />
            </div>
          </div>

          <div style={{ flex: 1 }}>
            {el[valueName]?.map((value, valueIndex) => (
              <div key={valueIndex} style={{ marginBottom: "10px" }}>
                <InputLabel>{valueLabel}</InputLabel>

                <div style={{ display: "flex", alignItems: "center" }}>
                  <RawInput
                    style={{ flex: 1 }}
                    placeholder={valuePlaceholder}
                    value={value}
                    onChange={(e) => handleValueChange(e, index, valueIndex)}
                  />
                  <div style={{ marginLeft: "10px", width: "30px" }}>
                    {valueIndex !== 0 && (
                      <RemoveButton
                        onClick={() => handleRemoveValue(index, valueIndex)}
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}

            <div>
              <Button
                style={{
                  width: "174px",
                  height: "52px",
                }}
                $outlined="true"
                withicon="true"
                onClick={() => handleAddValue(index)}
              >
                {addNewValueLabel}
                <AddOutlinedIcon />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div style={{ padding: "20px 40px" }}>
        {formData?.map((el, index) => renderGroup(el, index))}
        <Button
          style={{
            marginTop: "16px",
            height: "52px",
            width: "174px",
          }}
          whiteoutlined="true"
          withicon="true"
          onClick={handleAddKey}
          disabled={isWorking}
        >
          {addNewGroupLabel}
          <AddOutlinedIcon />
        </Button>
      </div>
    </>
  );
};

export default IntentForm;
