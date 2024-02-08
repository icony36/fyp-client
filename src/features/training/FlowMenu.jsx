import React, { useCallback } from "react";

import { getNewEdge, getNodeId } from "../../utils/helpers";
import styled, { css } from "styled-components";

const MenuContainer = styled.div`
  background-color: white;
  padding: 0;
  margin: 0;
  border: 2px solid var(--color-primary-darker);
  box-shadow: 10px 19px 20px rgba(0, 0, 0, 10%);
  position: absolute;
  z-index: 10;
  border-radius: 8px;
  overflow: hidden;
`;

const MenuButton = styled.button`
  border: none;
  display: block;
  padding: 6px 12px;
  width: 100%;
  background-color: transparent;
  cursor: pointer;
  color: var(--color-primary-darker);
  margin: 0;
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */

  &:hover {
    background-color: var(--color-primary);
    color: white;
  }
`;

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
            <MenuButton onClick={duplicateNode}>Duplicate</MenuButton>
            <MenuButton onClick={deleteNode}>Delete</MenuButton>
          </>
        );
      case "edge":
        return (
          <>
            <MenuButton onClick={deleteEdge}>Delete</MenuButton>
          </>
        );
      case "selection":
        return (
          <>
            <MenuButton onClick={duplicateSelection}>Duplicate</MenuButton>
            <MenuButton onClick={deleteSelection}>Delete</MenuButton>
          </>
        );
      default:
        return <></>;
    }
  };

  return (
    <>
      <MenuContainer style={{ top, left, right, bottom }} {...props}>
        {renderButtons()}
      </MenuContainer>
    </>
  );
};

export default FlowMenu;
