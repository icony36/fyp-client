import React, { useState } from "react";
import { Handle, Position } from "reactflow";

import "reactflow/dist/style.css";
import { Card, CardContent, TextField, MenuItem } from "@mui/material";

const StepNode = ({ data, isConnectable, selected }) => {
  const { nodeOptions, intentOptions, responseOptions } = data;

  const [nodeType, setNodeType] = useState("Intent");

  const renderOptions = () => {
    switch (nodeType) {
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
              id="nodeType"
              label="Type"
              name="nodeType"
              value={nodeType}
              onChange={(e) => setNodeType(e.target.value)}
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
            {nodeType ? (
              <TextField
                select
                sx={{ width: "15ch" }}
                size="small"
                className="nodrag"
                id="step"
                label={nodeType}
                name="step"
                value={""}
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
