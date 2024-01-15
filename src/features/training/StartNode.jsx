import React, { useMemo, useState } from "react";
import { Handle, Position, getConnectedEdges, useStore } from "reactflow";

import "reactflow/dist/style.css";
import { Card, CardContent, TextField } from "@mui/material";

const selector = (s) => ({
  nodeInternals: s.nodeInternals,
  edges: s.edges,
});

const StartNode = ({ id, data, isConnectable, selected }) => {
  const [nodeName, setNodeName] = useState("");
  const { nodeInternals, edges } = useStore(selector);

  const isHandleConnectable = useMemo(() => {
    const connectedEdges = getConnectedEdges([nodeInternals.get(id)], edges);

    return connectedEdges.length < 1 && isConnectable;
  }, [isConnectable, id, edges, nodeInternals]);

  return (
    <>
      <Card
        variant="outlined"
        className={`node ${selected ? "node-selected" : ""}`}
      >
        <CardContent>
          <TextField
            sx={{ width: "25ch" }}
            size="small"
            className="nodrag"
            variant="outlined"
            label="Flow Name"
            name="nodeName"
            value={nodeName}
            onChange={(e) => setNodeName(e.target.value)}
          />
        </CardContent>
      </Card>

      <Handle
        type="source"
        id={`source-${data?.nodeId}`}
        position={Position.Bottom}
        isConnectable={isHandleConnectable}
      />
    </>
  );
};

export default StartNode;
