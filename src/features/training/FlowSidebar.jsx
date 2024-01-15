import React from "react";
import ReactFlow, { Panel } from "reactflow";

import { Paper, Card, IconButton, Typography } from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import RestoreIcon from "@mui/icons-material/Restore";
import UpdateIcon from "@mui/icons-material/Update";

const FlowSidebar = ({ undo, redo, canUndo, canRedo }) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <>
      <Panel position="top-right">
        <Paper className="flow-sidebar" variant="outlined">
          <Card
            variant="outlined"
            className="flow-sidebar-node"
            onDragStart={(e) => onDragStart(e, "startNode")}
            sx={{ border: 1 }}
            draggable
          >
            <Typography variant="button">Start Node</Typography>
          </Card>

          <Card
            variant="outlined"
            className="flow-sidebar-node"
            onDragStart={(e) => onDragStart(e, "stepNode")}
            sx={{ border: 1 }}
            draggable
          >
            <Typography variant="button">Step Node</Typography>
          </Card>

          <div
            style={{
              display: "flex",
              marginTop: "28px",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <IconButton
              size="large"
              onClick={() => undo()}
              disabled={!canUndo}
              color="primary"
            >
              <RestoreIcon fontSize="inherit" />
            </IconButton>
            <IconButton
              size="large"
              onClick={() => redo()}
              disabled={!canRedo}
              color="primary"
            >
              <UpdateIcon fontSize="inherit" />
            </IconButton>
          </div>
        </Paper>
      </Panel>
    </>
  );
};

export default FlowSidebar;
