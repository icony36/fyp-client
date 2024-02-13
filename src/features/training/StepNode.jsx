import React, { useState, useEffect } from "react";
import { Handle, Position } from "reactflow";

import "reactflow/dist/style.css";
import { NodeContainer } from "../../ui/Node";
import { SelectInput } from "../../ui/Input";

const StepNode = ({ id, data, isConnectable, selected }) => {
  const { setUpdatedNode, nodeOptions, intentOptions, responseOptions } = data;

  const [contentType, setContentType] = useState("Intent");
  const [contentValue, setContentValue] = useState("");

  useEffect(() => {
    if (data.content?.contentType) {
      setContentType(data.content.contentType);
    }

    if (data.content?.contentValue) {
      setContentValue(data.content.contentValue);
    }
  }, []);

  useEffect(() => {
    setUpdatedNode({ id, content: { contentType, contentValue } });
  }, [contentType, contentValue, id, setUpdatedNode]);

  const handleContentTypeChanged = (value) => {
    setContentType(value);
    setContentValue("");
  };

  const getStepOptions = () => {
    const arr = [];

    switch (contentType) {
      case "Intent":
        if (intentOptions.length > 0) {
          intentOptions.forEach((el) => arr.push(el.name));
        }
        break;
      case "Response":
        if (responseOptions.length > 0) {
          responseOptions.forEach((el) => arr.push(el.name));
        }
        break;
      default:
        break;
    }

    return arr;
  };

  return (
    <>
      <Handle
        type="target"
        id={`target-${data?.nodeId}`}
        position={Position.Top}
        isConnectable={isConnectable}
      />

      <NodeContainer selected={selected ? 1 : undefined}>
        <div>
          <SelectInput
            label="Type"
            className="nodrag"
            options={nodeOptions}
            name="contentType"
            value={contentType}
            onChange={(e) => handleContentTypeChanged(e.target.value)}
            containerProps={{
              style: {
                minWidth: "300px",
              },
            }}
          />
        </div>

        <div style={{ marginTop: "8px" }}>
          {contentType && (
            <SelectInput
              label={contentType}
              className="nodrag"
              options={getStepOptions()}
              name="step"
              value={contentValue}
              onChange={(e) => setContentValue(e.target.value)}
              containerProps={{
                style: {
                  minWidth: "300px",
                },
              }}
            />
          )}
        </div>
      </NodeContainer>

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
