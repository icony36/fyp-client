import React from "react";
import ReactFlow, { Panel } from "reactflow";

import { IconButton } from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import UpdateIcon from "@mui/icons-material/Update";
import styled from "styled-components";
import { Heading } from "../../ui/Typography";

const SidebarContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  border: 4px solid var(--color-primary);
  padding: 20px;
`;

const SidebarItem = styled.div`
  background-color: white;
  border-radius: 10px;
  border: 2px solid black;
  padding: 10px 20px;
  text-align: center;
  cursor: pointer;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
`;

const FlowSidebar = ({ undo, redo, canUndo, canRedo }) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <>
      <Panel position="top-right">
        <SidebarContainer>
          <SidebarItem
            style={{ marginBottom: "16px" }}
            onDragStart={(e) => onDragStart(e, "startNode")}
            draggable
          >
            <Heading as="h3">START NODE</Heading>
          </SidebarItem>

          <SidebarItem
            onDragStart={(e) => onDragStart(e, "stepNode")}
            draggable
          >
            <Heading as="h3">STEP NODE</Heading>
          </SidebarItem>

          <div
            style={{
              display: "flex",
              marginTop: "20px",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <IconButton
              size="large"
              onClick={() => undo()}
              disabled={!canUndo}
              sx={{ color: "var(--color-primary)" }}
            >
              <RestoreIcon fontSize="inherit" />
            </IconButton>
            <IconButton
              size="large"
              onClick={() => redo()}
              disabled={!canRedo}
              sx={{ color: "var(--color-primary)" }}
            >
              <UpdateIcon fontSize="inherit" />
            </IconButton>
          </div>
        </SidebarContainer>
      </Panel>
    </>
  );
};

export default FlowSidebar;
