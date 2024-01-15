import React, { useState, useEffect } from "react";
import { ReactFlowProvider, useNodesState, useEdgesState } from "reactflow";
import useUndoable from "use-undoable";

import { Tabs, Tab, Box, Button, Toolbar } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import TextForm from "./TextForm";
import FlowEditor from "./FlowEditor";

const tabs = ["Intents", "Responses", "Flows"];

const nodeOptions = ["Intent", "Response"];

const initNodes = [];

const initEdges = [];

const TrainingPanel = () => {
  const [tab, setTab] = useState(0);

  const [elements, setElements, { past, undo, canUndo, redo, canRedo }] =
    useUndoable(
      { nodes: initNodes, edges: initEdges },
      {
        behavior: "destroyFuture",
      }
    );

  const initIntent = {
    name: "",
    examples: [""],
  };

  const [intents, setIntents] = useState([initIntent]);

  const initResponses = {
    name: "",
    text: [""],
  };

  const [responses, setResponses] = useState([initResponses]);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleSave = () => {
    console.log("Save:");
    console.log(intents);
    console.log(responses);
    console.log(elements.nodes);
    console.log(elements.edges);
    console.log(elements);
  };

  const renderTab = () => {
    switch (tab) {
      case 0:
        return (
          <TextForm
            formData={intents}
            setFormData={setIntents}
            initData={initIntent}
            valueName="examples"
            keyLabel="Intent Name"
            valueLabel="Example"
            addNewGroupLabel="Add New Intent"
            addNewValueLabel="Add New Example"
          />
        );
      case 1:
        return (
          <TextForm
            formData={intents}
            setFormData={setIntents}
            initData={initIntent}
            valueName="examples"
            keyLabel="Response Name"
            valueLabel="Text"
            addNewGroupLabel="Add New Response"
            addNewValueLabel="Add New Text"
          />
        );
      case 2:
        return (
          <ReactFlowProvider>
            <FlowEditor
              formData={intents}
              setFormData={setIntents}
              initData={initIntent}
              valueName="examples"
              valueLabel="Step"
              nodeOptions={nodeOptions}
              intentOptions={intents}
              responseOptions={responses}
              nodes={elements.nodes}
              edges={elements.edges}
              setElements={setElements}
              undo={undo}
              redo={redo}
              canUndo={canUndo}
              canRedo={canRedo}
            />
          </ReactFlowProvider>
        );
      default:
        return <></>;
    }
  };

  return (
    <>
      <div>
        <Box sx={{ minWidth: 325, minHeight: 500, padding: "0 70px" }}>
          <Toolbar
            sx={{
              justifyContent: "space-between",
            }}
            disableGutters
          >
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs value={tab} onChange={handleTabChange} centered>
                {tabs.map((label, index) => (
                  <Tab key={index} label={label} />
                ))}
              </Tabs>
            </Box>

            <Button
              sx={{ margin: "0 16px" }}
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSave}
            >
              Save
            </Button>
          </Toolbar>

          {renderTab()}
        </Box>
      </div>
    </>
  );
};

export default TrainingPanel;
