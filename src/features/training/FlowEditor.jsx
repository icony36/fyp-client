import React, { useState, useCallback, useRef, useEffect } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useReactFlow,
  getIncomers,
  getOutgoers,
  getConnectedEdges,
  SelectionMode,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";

import "reactflow/dist/style.css";

import {
  getFlowMenuPosition,
  getNewEdge,
  getNewNode,
} from "../../utils/helpers";
import FlowSidebar from "./FlowSidebar";
import StartNode from "./StartNode";
import StepNode from "./StepNode";
import FlowMenu from "./FlowMenu";

const nodeTypes = { startNode: StartNode, stepNode: StepNode };

const nodeColor = (node) => {
  switch (node.type) {
    case "startNode ":
      return "#bdbdbd";
    default:
      return "#eeeeee";
  }
};

const FlowEditor = ({
  nodeOptions,
  intentOptions,
  responseOptions,
  nodes,
  edges,
  setUpdatedNode,
  setElements,
  undo,
  redo,
  canUndo,
  canRedo,
  onInit,
}) => {
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [menu, setMenu] = useState(null);

  const menuRef = useRef(null);
  const reactFlowWrapper = useRef(null);
  const connectingNodeId = useRef(null);

  const { screenToFlowPosition, getEdges } = useReactFlow();

  const handleInit = (flowInstance) => {
    onInit();
    setReactFlowInstance(flowInstance);
  };

  const setElementsWithChanges = useCallback(
    (type, updatedElements, ignore = false) => {
      setElements(
        (el) => ({
          nodes: type === "nodes" ? updatedElements : el.nodes,
          edges: type === "edges" ? updatedElements : el.edges,
        }),
        "destroyFuture",
        ignore
      );
    },
    [setElements]
  );

  const getNodeData = useCallback(
    (additionalData = {}) => {
      return {
        ...additionalData,
        nodeOptions,
        intentOptions,
        responseOptions,
        setUpdatedNode,
      };
    },
    [nodeOptions, intentOptions, responseOptions, setUpdatedNode]
  );

  const addNewNode = useCallback(
    (nodeType, position, additionalData = {}) => {
      const data = getNodeData(additionalData);

      const newNode = getNewNode(nodeType, position, data);

      setElements((el) => ({ ...el, nodes: [...el.nodes, newNode] }));
    },
    [setElements, getNodeData]
  );

  const addNewEdge = useCallback(
    (sourceId, targetId) => {
      const newEdge = getNewEdge(sourceId, targetId);

      setElements((el) => ({ nodes: el.nodes, edges: [...el.edges, newEdge] }));
    },
    [setElements]
  );

  const deleteNodes = useCallback(
    (deletedNodes) => {
      // reconnect nodes when middle node is deleted
      const newEdges = deletedNodes.reduce((acc, node) => {
        const incomers = getIncomers(node, nodes, edges);
        const outgoers = getOutgoers(node, nodes, edges);
        const connectedEdges = getConnectedEdges([node], edges);

        const remainingEdges = acc.filter(
          (edge) => !connectedEdges.includes(edge)
        );

        const createdEdges = incomers
          .flatMap(({ id: source }) =>
            outgoers.map(({ id: target }) => getNewEdge(source, target))
          )
          // filter out edges with deleted node
          .filter(
            (edge) =>
              !deletedNodes.some(
                (node) => node.id === edge.source || node.id === edge.target
              )
          );

        return [...remainingEdges, ...createdEdges];
      }, edges);

      // delete nodes with new edges
      setElements((el) => ({
        nodes: el.nodes.filter((node) =>
          deletedNodes.every((deletedNode) => deletedNode.id !== node.id)
        ),
        edges: newEdges,
      }));
    },
    [nodes, edges, setElements]
  );

  const getNode = useCallback(
    (id) => {
      return nodes.find((node) => node.id === id);
    },
    [nodes]
  );

  const onConnect = useCallback(
    (params) => {
      // reset the start node on connections
      connectingNodeId.current = null;

      addNewEdge(params.source, params.target);
    },
    [addNewEdge]
  );

  const onConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);

  const onConnectEnd = useCallback(
    (event) => {
      if (!connectingNodeId.current) return;

      // remove the wrapper bounds, in order to get the correct position
      const targetIsPane = event.target.classList.contains("react-flow__pane");

      if (targetIsPane) {
        const position = screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        });

        const data = getNodeData();

        const newNode = getNewNode("stepNode", position, data);
        const newEdge = getNewEdge(connectingNodeId.current, newNode.id);

        setElements((el) => ({
          edges: [...el.edges, newEdge],
          nodes: [...el.nodes, newNode],
        }));
      }
    },
    [screenToFlowPosition, setElements, getNodeData]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      addNewNode(type, position);
    },
    [reactFlowInstance, addNewNode]
  );

  const isValidConnection = useCallback(
    (connection) => {
      if (connection.source === connection.target) {
        return false;
      }

      const edges = getEdges();
      const target = edges.find((edge) => edge.target === connection.target);

      if (target) {
        return false;
      }

      return true;
    },
    [getEdges]
  );

  const onNodesChange = useCallback(
    (changes) => {
      // don't save these changes in the history
      let ignore = ["select", "position", "dimensions"].includes(
        changes[0].type
      );

      if (changes[0].type === "remove") {
        const deletedNodes = changes.map((el) => getNode(el.id));

        deleteNodes(deletedNodes);
      } else {
        setElementsWithChanges(
          "nodes",
          applyNodeChanges(changes, nodes),
          ignore
        );
      }
    },
    [setElementsWithChanges, deleteNodes, nodes, getNode]
  );

  const onEdgesChange = useCallback(
    (changes) => {
      // don't save these changes in the history
      let ignore = ["select"].includes(changes[0].type);

      setElementsWithChanges("edges", applyEdgeChanges(changes, edges), ignore);
    },
    [setElementsWithChanges, edges]
  );

  const onNodeContextMenu = useCallback(
    (event, node) => {
      event.preventDefault();

      // Calculate position of the context menu. We want to make sure it doesn't get positioned off-screen.
      const position = getFlowMenuPosition(event, menuRef);

      setMenu({
        id: node.id,
        type: "node",
        ...position,
      });
    },
    [setMenu]
  );

  const onEdgeContextMenu = useCallback(
    (event, edge) => {
      event.preventDefault();

      // Calculate position of the context menu. We want to make sure it doesn't get positioned off-screen.
      const position = getFlowMenuPosition(event, menuRef);

      setMenu({
        id: edge.id,
        type: "edge",
        ...position,
      });
    },
    [setMenu]
  );

  const onSelectionContextMenu = useCallback(
    (event, nodes) => {
      event.preventDefault();

      // Calculate position of the context menu. We want to make sure it doesn't get positioned off-screen.
      const position = getFlowMenuPosition(event, menuRef);

      setMenu({
        selectedNodes: nodes,
        type: "selection",
        ...position,
      });
    },
    [setMenu]
  );

  const onSelectionChange = useCallback((nodes, edges) => {
    console.log(nodes, edges);
  }, []);

  const onPaneClick = useCallback(() => setMenu(null), [setMenu]);

  return (
    <>
      <div
        style={{
          borderRadius: "0 20px 20px 20px",
          height: "800px",
          backgroundColor: "white",
        }}
        ref={reactFlowWrapper}
      >
        <ReactFlow
          style={{ borderRadius: "0 20px 20px 20px" }}
          ref={menuRef}
          onInit={handleInit}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onConnectStart={onConnectStart}
          onConnectEnd={onConnectEnd}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeOrigin={[0.5, 0]}
          nodeTypes={nodeTypes}
          isValidConnection={isValidConnection}
          minZoom={0.4}
          maxZoom={1.4}
          fitView
          fitViewOptions={{ padding: 2 }}
          snapToGrid={true}
          snapGrid={[20, 20]}
          panOnScroll
          selectionOnDrag
          panOnDrag={[1, 2]}
          onPaneClick={onPaneClick}
          onNodeContextMenu={onNodeContextMenu}
          onEdgeContextMenu={onEdgeContextMenu}
          onSelectionContextMenu={onSelectionContextMenu}
          // onSelectionChange={onSelectionChange}
          selectionMode={SelectionMode.Partial}
          proOptions={{ hideAttribution: true }}
          deleteKeyCode={["Backspace", "Delete"]}
        >
          <MiniMap
            nodeColor={nodeColor}
            nodeStrokeWidth={3}
            zoomable
            pannable
          />
          <FlowSidebar
            undo={undo}
            redo={redo}
            canUndo={canUndo}
            canRedo={canRedo}
          />
          {menu && (
            <FlowMenu
              onClick={onPaneClick}
              edges={edges}
              setElements={setElements}
              getNode={getNode}
              deleteNodes={deleteNodes}
              {...menu}
            />
          )}
          <Background variant={"lines"} />
          <Controls />
        </ReactFlow>
      </div>
    </>
  );
};

export default FlowEditor;
