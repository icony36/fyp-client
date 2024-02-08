import React, { useMemo, useState } from "react";
import { Handle, Position, getConnectedEdges, useStore } from "reactflow";

import "reactflow/dist/style.css";
import { NodeContainer } from "../../ui/Node";
import { Input } from "../../ui/Input";

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
      <NodeContainer selected={selected ? 1 : undefined}>
        <Input
          className="nodrag"
          label="Flow Name"
          name="nodeName"
          value={nodeName}
          onChange={(e) => setNodeName(e.target.value)}
          containerProps={{
            style: {
              minWidth: "300px",
            },
          }}
        />
      </NodeContainer>

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
