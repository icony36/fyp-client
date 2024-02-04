import React, { useState, useEffect } from "react";
import { Handle, Position } from "reactflow";

import "reactflow/dist/style.css";
import { Card, CardContent, TextField, MenuItem } from "@mui/material";

const StepNode = ({ id, data, isConnectable, selected }) => {
  const { setUpdatedNode, nodeOptions, intentOptions, responseOptions } = data;

  const [contentType, setContentType] = useState("Intent");
  const [contentValue, setContentValue] = useState("");

  useEffect(() => {
    setUpdatedNode({ id, content: { contentType, contentValue } });
  }, [contentType, contentValue, id, setUpdatedNode]);

  const handleContentTypeChanged = (value) => {
    setContentType(value);
    setContentValue("");
  };

  const renderOptions = () => {
    switch (contentType) {
      case "Intent":
        if (intentOptions.length <= 0) {
          return (
            <MenuItem sx={{ width: "20ch" }} value={""}>
              None
            </MenuItem>
          );
        }

        return intentOptions.map((el, index) => (
          <MenuItem sx={{ width: "20ch" }} key={index} value={el.name}>
            {el.name ? el.name : "None"}
          </MenuItem>
        ));
      case "Response":
        if (responseOptions.length <= 0) {
          return <MenuItem value={""}>None</MenuItem>;
        }

        return responseOptions.map((el, index) => (
          <MenuItem sx={{ width: "20ch" }} key={index} value={el.name}>
            {el.name ? el.name : "None"}
          </MenuItem>
        ));
      default:
        return (
          <MenuItem sx={{ width: "20ch" }} value={""}>
            Error
          </MenuItem>
        );
    }
  };

  return (
    <>
      <Handle
        type="target"
        id={`target-${data?.nodeId}`}
        position={Position.Top}
        isConnectable={isConnectable}
      />

      <Card
        variant="outlined"
        className={`node ${selected ? "node-selected" : ""}`}
      >
        <CardContent>
          <div>
            <TextField
              select
              sx={{ width: "15ch" }}
              size="small"
              className="nodrag"
              id="contentType"
              label="Type"
              name="contentType"
              value={contentType}
              onChange={(e) => handleContentTypeChanged(e.target.value)}
            >
              {nodeOptions.map((el, index) => {
                return (
                  <MenuItem style={{ width: "20ch" }} key={index} value={el}>
                    {el}
                  </MenuItem>
                );
              })}
            </TextField>
          </div>

          <div style={{ marginTop: "8px" }}>
            {contentType ? (
              <TextField
                select
                sx={{ width: "15ch" }}
                size="small"
                className="nodrag"
                id="step"
                label={contentType}
                name="step"
                value={contentValue}
                onChange={(e) => setContentValue(e.target.value)}
              >
                {renderOptions()}
              </TextField>
            ) : (
              <></>
            )}
          </div>
        </CardContent>
      </Card>

      <Handle
        type="source"
        id={`source-${data?.nodeId}`}
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </>
  );
};

export default StepNode;
