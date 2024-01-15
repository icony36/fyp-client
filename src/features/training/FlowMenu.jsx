import React, { useCallback } from "react";

import { getNewEdge, getNodeId } from "../../utils/helpers";

const FlowMenu = ({
  id,
  type,
  selectedNodes,
  top,
  left,
  right,
  bottom,
  edges,
  setElements,
  addNewNode,
  addNewEdge,
  getNode,
  deleteNodes,
  ...props
}) => {
  const duplicateNode = useCallback(() => {
    const node = getNode(id);

    const newId = getNodeId();
    const position = {
      x: node.position.x + 100,
      y: node.position.y + 20,
    };

    const newNodes = {
      ...node,
      id: newId,
      position,
    };

    // addNodes({ ...node, id: newId, position });
    setElements((el) => ({ ...el, nodes: [...el.nodes, newNodes] }));
  }, [id, getNode, setElements]);

  const deleteNode = useCallback(() => {
    const node = getNode(id);

    deleteNodes([node]);
  }, [id, deleteNodes, getNode]);

  const deleteEdge = useCallback(() => {
    // setEdges((edges) => edges.filter((edge) => edge.id !== id));
    setElements((el) => ({
      ...el,
      edges: el.edges.filter((edge) => edge.id !== id),
    }));
  }, [id, setElements]);

  const duplicateSelection = useCallback(() => {
    // get selected edges
    const selectedEdges = [...edges.filter((edge) => edge.selected)];

    // map for new id with old id
    const nodeMap = {};

    // create duplicate nodes
    const createdNodes = selectedNodes.map((node) => {
      const newId = getNodeId();
      const position = {
        x: node.position.x + 200,
        y: node.position.y + 20,
      };

      nodeMap[node.id] = newId;

      return { ...node, id: newId, position, selected: true };
    });

    // create duplicate edges
    const createdEdges = [];
    for (let i = 0; i < selectedEdges.length; i++) {
      const edge = selectedEdges[i];

      const sourceId = nodeMap[edge.source];
      const targetId = nodeMap[edge.target];

      if (sourceId && targetId) {
        const newEdge = getNewEdge(sourceId, targetId);

        createdEdges.push({ ...newEdge, selected: true });
      }
    }

    // add new nodes and new edges
    setElements((el) => ({
      nodes: [
        ...el.nodes.map((node) => ({ ...node, selected: false })),
        ...createdNodes,
      ],
      edges: [
        ...el.edges.map((edge) => ({ ...edge, selected: false })),
        ...createdEdges,
      ],
    }));
  }, [selectedNodes, setElements, edges]);

  const deleteSelection = useCallback(() => {
    deleteNodes(selectedNodes);
  }, [selectedNodes, deleteNodes]);

  const renderButtons = () => {
    switch (type) {
      case "node":
        return (
          <>
            <button onClick={duplicateNode}>duplicate</button>
            <button onClick={deleteNode}>delete</button>
          </>
        );
      case "edge":
        return (
          <>
            <button onClick={deleteEdge}>delete</button>
          </>
        );
      case "selection":
        return (
          <>
            <button onClick={duplicateSelection}>duplicate</button>
            <button onClick={deleteSelection}>delete</button>
          </>
        );
      default:
        return <></>;
    }
  };

  return (
    <>
      <div
        style={{ top, left, right, bottom }}
        className="flow-menu"
        {...props}
      >
        {renderButtons()}
      </div>
    </>
  );
};

export default FlowMenu;
